import Decimal from "decimal.js";
import fx, {
    FxMode,
    EQN_COEFF_NAMES
} from "../observables/fx991-state";
import cs from "../observables/calculator-state";
import {
    parseCplx,
    cplxToString,
    cplxReal,
    cplxImag,
    cplxConj,
    cplxAbs,
    cplxPolar,
    Cplx
} from "../modules/fx991/cplx";
import {
    BaseRadix,
    parseBaseValue,
    formatBaseValue,
    isDigitChar,
    baseAdd,
    baseSub,
    baseMul,
    baseDiv,
    baseAndOp,
    baseOrOp,
    baseXorOp,
    baseXnorOp,
    baseNotOp
} from "../modules/fx991/basen";
import { EqnType, solveQuadratic, solveCubic, solveLinear2, solveLinear3 } from "../modules/fx991/eqn";
import { statResultToLines } from "../modules/fx991/stat";

/* ================================================================== */
/* 模式入口：各物理键在非 COMP 模式下分发给这里                        */
/* ================================================================== */

export const isFxModeActive = (): boolean => fx.mode !== "COMP";

/** 打开 FX 模式菜单 */
export const onOpenModeMenu = () => {
    fx.openModeMenu();
    cs.clearFuncMode();
};

/** 模式菜单选择（数字键 1-6） */
export const onModeMenuSelect = (key: string) => {
    switch (key) {
        case "1":
            fx.setMode("COMP");
            break;
        case "2":
            fx.setMode("CMPLX");
            break;
        case "3":
            fx.setMode("BASE_N");
            break;
        case "4":
            fx.setMode("EQN");
            break;
        case "5":
            fx.setMode("STAT");
            break;
        case "6":
            // 角度单位菜单（原 DRG）
            fx.closeModeMenu();
            cs.setDisplayMode("DRG");
            break;
        default:
            break;
    }
};

export const onCloseModeMenu = () => {
    fx.closeModeMenu();
};

/* ================================================================== */
/* 数字 / 小数点                                                       */
/* ================================================================== */

export const onDigit = (d: string) => {
    // MODE 菜单打开时，数字键用于选择模式
    if (fx.showModeMenu) {
        onModeMenuSelect(d);
        return;
    }
    switch (fx.mode) {
        case "CMPLX":
            fx.cplxAppend(d);
            break;
        case "BASE_N":
            if (isDigitChar(d, fx.baseRadix)) {
                fx.baseAppend(d);
            } else {
                fx.setFxError("Invalid digit");
            }
            break;
        case "EQN":
            // 未选择方程类型时，数字键用于选择类型
            if (fx.eqnType === null) {
                onEqnTypeSelect(d);
            } else {
                fx.eqnAppendDigit(d);
            }
            break;
        case "STAT":
            fx.cplxAppend(d); // 复用输入缓冲
            break;
    }
};

export const onDot = () => {
    switch (fx.mode) {
        case "CMPLX":
            fx.cplxAppend(".");
            break;
        case "BASE_N":
            break; // 进制模式无小数
        case "EQN":
            fx.eqnAppendDigit(".");
            break;
        case "STAT":
            fx.cplxAppend(".");
            break;
    }
};

/* ================================================================== */
/* 运算符                                                              */
/* ================================================================== */

export const onAdd = () => onBinaryOp("+");
export const onSub = () => onBinaryOp("-");
export const onMul = () => onBinaryOp("*");
export const onDiv = () => onBinaryOp("/");

function onBinaryOp(op: string) {
    switch (fx.mode) {
        case "CMPLX":
            fx.cplxAppend(op);
            break;
        case "BASE_N":
            baseBinaryOp(op);
            break;
        case "STAT":
        case "EQN":
            if (op === "-") {
                fx.eqnAppendDigit("-");
            }
            break;
        case "STAT":
            fx.setFxError("No operator in STAT");
            break;
    }
}

/** BASE-N 连续运算：累积器 + 运算符 + 当前输入 */
function baseBinaryOp(op: string) {
    const cur = fx.baseInput;
    const curVal = parseBaseValue(cur, fx.baseRadix);
    let accum = fx.baseAccum;

    if (fx.baseLastOp && accum !== null) {
        accum = applyBaseOp(accum, curVal, fx.baseLastOp);
    } else if (accum === null) {
        accum = curVal;
    }

    fx.baseAccum = accum;
    fx.baseLastOp = op;
    fx.baseInput = "";
    fx.baseResult = accum;
}

function applyBaseOp(a: Decimal, b: Decimal, op: string): Decimal {
    try {
        switch (op) {
            case "+":
                return baseAdd(a, b);
            case "-":
                return baseSub(a, b);
            case "*":
                return baseMul(a, b);
            case "/":
                return baseDiv(a, b);
            case "AND":
                return baseAndOp(a, b);
            case "OR":
                return baseOrOp(a, b);
            case "XOR":
                return baseXorOp(a, b);
            case "XNOR":
                return baseXnorOp(a, b);
            default:
                throw new Error("Syntax ERROR");
        }
    } catch (e) {
        fx.setFxError((e as Error).message || "Math ERROR");
        return a;
    }
}

/* ================================================================== */
/* 等号 / 确认                                                         */
/* ================================================================== */

export const onEq = () => {
    // MODE 菜单打开时，= 关闭菜单（等同确认）
    if (fx.showModeMenu) {
        fx.closeModeMenu();
        return;
    }
    switch (fx.mode) {
        case "CMPLX":
            try {
                const r = parseCplx(fx.cplxInput);
                fx.setCplxResult(r);
                fx.setFxError("");
            } catch (e) {
                fx.setFxError((e as Error).message || "Syntax ERROR");
            }
            break;
        case "BASE_N":
            try {
                const cur = parseBaseValue(fx.baseInput, fx.baseRadix);
                let result = cur;
                if (fx.baseAccum !== null && fx.baseLastOp) {
                    result = applyBaseOp(fx.baseAccum, cur, fx.baseLastOp);
                    fx.baseAccum = null;
                    fx.baseLastOp = "";
                }
                fx.baseInput = "";
                fx.setBaseResult(result);
                fx.setFxError("");
            } catch (e) {
                fx.setFxError((e as Error).message || "Math ERROR");
            }
            break;
        case "EQN":
            fx.eqnEnter();
            break;
        case "STAT":
            // 录入一条数据
            try {
                const v = new Decimal(fx.cplxInput || "0");
                fx.statAddValue(v);
                fx.cplxInput = "";
                fx.setFxError("");
            } catch (e) {
                fx.setFxError((e as Error).message || "Syntax ERROR");
            }
            break;
    }
};

/* ================================================================== */
/* 删除 / 清空                                                         */
/* ================================================================== */

export const onDel = () => {
    switch (fx.mode) {
        case "CMPLX":
            fx.cplxBackspace();
            break;
        case "BASE_N":
            fx.baseBackspace();
            break;
        case "EQN":
            fx.eqnBackspace();
            break;
        case "STAT":
            if (fx.cplxInput) {
                fx.cplxBackspace();
            } else {
                fx.statUndo();
            }
            break;
    }
};

export const onAc = () => {
    switch (fx.mode) {
        case "CMPLX":
            fx.cplxClear();
            break;
        case "BASE_N":
            fx.baseClear();
            break;
        case "EQN":
            fx.eqnClearAll();
            break;
        case "STAT":
            // AC 完成录入并显示统计结果（再按一次清空数据）
            if (!fx.statDone && fx.statData.length > 0) {
                fx.statCompute();
            } else {
                fx.statData = [];
                fx.statResult = null;
                fx.statDone = false;
            }
            break;
    }
};

/* ================================================================== */
/* SHIFT + 数字键（模式功能键）                                        */
/* ================================================================== */

export const onShiftDigit = (d: string) => {
    switch (fx.mode) {
        case "CMPLX":
            onCplxShiftDigit(d);
            break;
        case "BASE_N":
            onBaseShiftDigit(d);
            break;
        case "STAT":
            // SHIFT+1 查看统计结果
            if (d === "1") {
                if (!fx.statDone) {
                    fx.statCompute();
                }
            } else {
                fx.setFxError("S-VAR: press SHIFT 1");
            }
            break;
        default:
            break;
    }
};

function onCplxShiftDigit(d: string) {
    if (fx.cplxResult === null) {
        fx.setFxError("No result");
        return;
    }
    const r = fx.cplxResult;
    let v: Cplx | Decimal | null = null;
    switch (d) {
        case "1": // Re(
            v = cplxReal(r);
            break;
        case "2": // Im(
            v = cplxImag(r);
            break;
        case "3": // conjg(
            v = cplxConj(r);
            break;
        case "4": // arg(
            v = cplxArgOf(r);
            break;
        case "5": // |z| Abs
            v = cplxAbs(r);
            break;
        default:
            break;
    }
    if (v !== null) {
        if (v instanceof Decimal) {
            fx.setCplxResult({ re: v, im: new Decimal(0) });
        } else {
            fx.setCplxResult(v as Cplx);
        }
    }
}

function cplxArgOf(r: Cplx): Decimal {
    // 复用 cplx.ts 的 arg；为简洁直接实现
    if (r.re.isZero() && r.im.isZero()) {
        throw new Error("Math ERROR");
    }
    return new Decimal(Math.atan2(r.im.toNumber(), r.re.toNumber()));
}

function onBaseShiftDigit(d: string) {
    const cur = fx.baseInput;
    const curVal = parseBaseValue(cur, fx.baseRadix);
    let accum = fx.baseAccum;

    if (fx.baseLastOp && accum !== null) {
        accum = applyBaseOp(accum, curVal, fx.baseLastOp);
    } else if (accum === null) {
        accum = curVal;
    }

    const opMap: Record<string, string> = {
        "1": "AND",
        "2": "OR",
        "3": "XOR",
        "4": "XNOR",
        "5": "NOT"
    };
    const op = opMap[d];
    if (!op) {
        return;
    }
    if (op === "NOT") {
        fx.baseAccum = baseNotOp(accum);
    } else {
        fx.baseAccum = accum;
        fx.baseLastOp = op;
        fx.baseResult = accum;
    }
    fx.baseInput = "";
    fx.baseResult = op === "NOT" ? fx.baseAccum : accum;
}

/* ================================================================== */
/* ENG / i 键：CMPLX 模式输入 i                                        */
/* ================================================================== */

export const onEng = () => {
    if (fx.mode === "CMPLX") {
        fx.cplxAppend("i");
    }
};

/** 循环切换基数（BASE-N 模式按 ° ' " 键） */
export const onDegreeKey = () => {
    if (fx.mode === "BASE_N") {
        const cur = fx.baseInput !== ""
            ? parseBaseValue(fx.baseInput, fx.baseRadix)
            : fx.baseResult ?? fx.baseAccum ?? null;
        fx.cycleBaseRadix();
        if (cur !== null) {
            fx.baseResult = cur;
        }
    }
};

/** 极坐标切换（CMPLX 模式 SHIFT + ENG） */
export const onShiftEng = () => {
    if (fx.mode === "CMPLX") {
        fx.toggleCplxPolar();
    }
};

/* ================================================================== */
/* 方程类型选择（EQN 模式进入后按 1-4）                                */
/* ================================================================== */

export const onEqnTypeSelect = (d: string) => {
    const map: Record<string, EqnType> = {
        "1": "QUAD",
        "2": "CUBIC",
        "3": "LINEAR2",
        "4": "LINEAR3"
    };
    const t = map[d];
    if (t) {
        fx.setEqnType(t);
    }
};

/* ================================================================== */
/* 显示辅助                                                            */
/* ================================================================== */

export const fxModeLabel = (): string => {
    switch (fx.mode) {
        case "COMP":
            return "COMP";
        case "CMPLX":
            return "CMPLX";
        case "BASE_N":
            return `BASE-${fx.baseRadix}`;
        case "EQN":
            return "EQN";
        case "STAT":
            return "STAT";
    }
};

export const fxScreenLines = (): string[] => {
    switch (fx.mode) {
        case "CMPLX": {
            const lines: string[] = [fx.cplxInput || "0"];
            if (fx.errorMessage) {
                lines.push(fx.errorMessage);
            } else if (fx.cplxResult) {
                lines.push("=" + cplxToString(fx.cplxResult, fx.cplxPolar));
            }
            return lines;
        }
        case "BASE_N": {
            const lines: string[] = [];
            if (fx.baseAccum !== null && fx.baseLastOp) {
                lines.push(
                    formatBaseValue(fx.baseAccum, fx.baseRadix) +
                        " " +
                        fx.baseLastOp
                );
            }
            lines.push(
                fx.baseInput || (fx.baseResult !== null ? formatBaseValue(fx.baseResult, fx.baseRadix) : "0")
            );
            if (fx.errorMessage) {
                lines.push(fx.errorMessage);
            }
            return lines;
        }
        case "EQN": {
            if (fx.eqnDone && fx.eqnResult) {
                const names = eqnVarNames(fx.eqnType!);
                const lines = fx.eqnResult.roots.map((r, i) => `${names[i]}=${r}`);
                if (fx.eqnResult.info) {
                    lines.push(fx.eqnResult.info);
                }
                return lines.length > 0 ? lines : ["NO SOLUTION"];
            }
            if (fx.eqnType === null) {
                return ["EQN", "1:aX²+bX+c=0", "2:aX³+...=0", "3:2-linear", "4:3-linear"];
            }
            const names = EQN_COEFF_NAMES[fx.eqnType];
            const idx = fx.eqnCoeffs.length;
            const cur = fx.eqnCur;
            const lines = fx.eqnCoeffs.map((c, i) => `${names[i]}=${c}`);
            if (idx < names.length) {
                lines.push(`${names[idx]}=${cur}`);
            }
            return lines;
        }
        case "STAT": {
            if (fx.statDone && fx.statResult) {
                const lines = statResultToLines(fx.statResult);
                return lines;
            }
            const lines = fx.statData.map((v, i) => `${i + 1}:${v.toString()}`);
            if (fx.cplxInput) {
                lines.push(`>${fx.cplxInput}`);
            }
            return lines.length > 0 ? lines : ["Enter data, press ="];
        }
        default:
            return [];
    }
};

function eqnVarNames(t: EqnType): string[] {
    switch (t) {
        case "QUAD":
            return ["X1", "X2"];
        case "CUBIC":
            return ["X1", "X2", "X3"];
        case "LINEAR2":
            return ["X", "Y"];
        case "LINEAR3":
            return ["X", "Y", "Z"];
    }
}
