import { makeAutoObservable } from "mobx";
import Decimal from "decimal.js";
import { Cplx, CPLX_ZERO } from "../modules/fx991/cplx";
import { BaseRadix, BASE_RADICES } from "../modules/fx991/basen";
import {
    EqnType,
    EqnResult,
    solveQuadratic,
    solveCubic,
    solveLinear2,
    solveLinear3
} from "../modules/fx991/eqn";
import { computeStat, StatResult } from "../modules/fx991/stat";

export type FxMode = "COMP" | "CMPLX" | "BASE_N" | "EQN" | "STAT";

export const FX_MODES: FxMode[] = ["COMP", "CMPLX", "BASE_N", "EQN", "STAT"];

export const MODE_MENU_ITEMS: Array<{ key: string; label: string }> = [
    { key: "1", label: "COMP  计算" },
    { key: "2", label: "CMPLX 复数" },
    { key: "3", label: "BASE-N 进制" },
    { key: "4", label: "EQN  方程" },
    { key: "5", label: "STAT 统计" }
];

/** 方程类型的系数名与求解决策 */
export const EQN_COEFF_NAMES: Record<EqnType, string[]> = {
    QUAD: ["a", "b", "c"],
    CUBIC: ["a", "b", "c", "d"],
    LINEAR2: ["a1", "b1", "c1", "a2", "b2", "c2"],
    LINEAR3: ["a1", "b1", "c1", "d1", "a2", "b2", "c2", "d2", "a3", "b3", "c3", "d3"]
};

class Fx991State {
    constructor() {
        makeAutoObservable(this);
    }

    // ---- 模式与菜单 ----
    mode: FxMode = "COMP";
    showModeMenu: boolean = false;
    errorMessage: string = "";

    // ---- CMPLX ----
    cplxInput: string = "";
    cplxResult: Cplx | null = null;
    cplxPolar: boolean = false;

    // ---- BASE-N ----
    baseRadix: BaseRadix = "DEC";
    baseInput: string = "";
    baseResult: Decimal | null = null;
    baseLastOp: string = ""; // "+" | "-" | "*" | "/" | "AND" | ...
    baseAccum: Decimal | null = null;

    // ---- EQN ----
    eqnType: EqnType | null = null;
    /** 已确认的系数 */
    eqnCoeffs: string[] = [];
    /** 当前正在输入的系数 */
    eqnCur: string = "";
    eqnResult: EqnResult | null = null;
    eqnDone: boolean = false;

    // ---- STAT ----
    statData: Decimal[] = [];
    statResult: StatResult | null = null;
    statDone: boolean = false;
    statEditIndex: number = -1;

    /* ---------------- 模式切换 ---------------- */

    setMode(m: FxMode) {
        this.mode = m;
        this.showModeMenu = false;
        this.errorMessage = "";
        this.cplxInput = "";
        this.cplxResult = null;
        this.baseInput = "";
        this.baseResult = null;
        this.baseAccum = null;
        this.baseLastOp = "";
        this.baseRadix = "DEC";
        this.eqnType = null;
        this.eqnCoeffs = [];
        this.eqnCur = "";
        this.eqnResult = null;
        this.eqnDone = false;
        this.statData = [];
        this.statResult = null;
        this.statDone = false;
        this.statEditIndex = -1;
    }

    openModeMenu() {
        this.showModeMenu = true;
        this.errorMessage = "";
    }

    closeModeMenu() {
        this.showModeMenu = false;
    }

    /* ---------------- CMPLX ---------------- */

    cplxAppend(ch: string) {
        if (this.errorMessage) {
            this.clearFxError();
        }
        if (this.cplxResult !== null && !this.cplxInput) {
            // 从结果继续输入时清掉结果
        }
        this.cplxInput += ch;
    }

    cplxBackspace() {
        this.cplxInput = this.cplxInput.slice(0, -1);
    }

    cplxClear() {
        this.cplxInput = "";
        this.cplxResult = null;
    }

    setCplxResult(r: Cplx) {
        this.cplxResult = r;
    }

    toggleCplxPolar() {
        this.cplxPolar = !this.cplxPolar;
    }

    /* ---------------- BASE-N ---------------- */

    cycleBaseRadix() {
        const idx = BASE_RADICES.indexOf(this.baseRadix);
        this.baseRadix = BASE_RADICES[(idx + 1) % BASE_RADICES.length];
        this.baseInput = "";
        this.baseResult = null;
        this.baseAccum = null;
        this.baseLastOp = "";
    }

    baseAppend(ch: string) {
        if (this.errorMessage) {
            this.clearFxError();
        }
        this.baseInput += ch;
    }

    baseBackspace() {
        this.baseInput = this.baseInput.slice(0, -1);
    }

    baseClear() {
        this.baseInput = "";
        this.baseResult = null;
        this.baseAccum = null;
        this.baseLastOp = "";
    }

    setBaseResult(r: Decimal) {
        this.baseResult = r;
    }

    /* ---------------- EQN ---------------- */

    setEqnType(t: EqnType) {
        this.eqnType = t;
        this.eqnCoeffs = [];
        this.eqnCur = "";
        this.eqnResult = null;
        this.eqnDone = false;
    }

    eqnAppendDigit(ch: string) {
        if (this.eqnDone || this.eqnType === null) {
            return;
        }
        if (ch === "-") {
            if (this.eqnCur === "") {
                this.eqnCur = "-";
            } else if (this.eqnCur === "-") {
                this.eqnCur = "";
            }
            return;
        }
        // 一个小数点限制
        if (ch === "." && this.eqnCur.includes(".")) {
            return;
        }
        this.eqnCur += ch;
    }

    /** 确认当前系数并进入下一个；全部系数就绪时求解 */
    eqnEnter() {
        if (this.eqnType === null || this.eqnDone) {
            return;
        }
        const names = EQN_COEFF_NAMES[this.eqnType];
        let cur = this.eqnCur;
        if (cur === "-") {
            cur = "-1";
        }
        if (cur === "") {
            cur = "0";
        }
        this.eqnCoeffs.push(cur);
        this.eqnCur = "";

        if (this.eqnCoeffs.length >= names.length) {
            // 所有系数就绪，立刻求解
            this.eqnSolve();
        }
    }

    eqnSolve() {
        if (this.eqnType === null || this.eqnResult) {
            return;
        }
        const nums = this.eqnCoeffs.map(x => new Decimal(x || "0"));
        let result: EqnResult;
        switch (this.eqnType) {
            case "QUAD":
                result = solveQuadratic(nums[0], nums[1], nums[2]);
                break;
            case "CUBIC":
                result = solveCubic(nums[0], nums[1], nums[2], nums[3]);
                break;
            case "LINEAR2":
                result = solveLinear2(
                    nums[0], nums[1], nums[2],
                    nums[3], nums[4], nums[5]
                );
                break;
            case "LINEAR3":
                result = solveLinear3(
                    nums[0], nums[1], nums[2], nums[3],
                    nums[4], nums[5], nums[6], nums[7],
                    nums[8], nums[9], nums[10], nums[11]
                );
                break;
        }
        this.eqnResult = result;
        this.eqnDone = true;
    }

    eqnBackspace() {
        if (this.eqnDone) {
            return;
        }
        if (this.eqnCur.length > 0) {
            this.eqnCur = this.eqnCur.slice(0, -1);
        } else if (this.eqnCoeffs.length > 0) {
            this.eqnCur = this.eqnCoeffs.pop()!;
        }
    }

    eqnClearAll() {
        this.eqnCoeffs = [];
        this.eqnCur = "";
        this.eqnResult = null;
        this.eqnDone = false;
    }

    setEqnResult(r: EqnResult) {
        this.eqnResult = r;
        this.eqnDone = true;
    }

    eqnReEdit() {
        if (this.eqnResult) {
            this.eqnCoeffs = [];
            this.eqnCur = "";
            this.eqnResult = null;
            this.eqnDone = false;
        }
    }

    /* ---------------- STAT ---------------- */

    statAddValue(v: Decimal) {
        if (this.statDone) {
            return;
        }
        this.statData.push(v);
    }

    statUndo() {
        if (this.statData.length > 0) {
            this.statData.pop();
        }
    }

    statCompute() {
        this.statResult = computeStat(this.statData);
        this.statDone = true;
    }

    statReEdit() {
        this.statDone = false;
        this.statResult = null;
    }

    /* ---------------- error ---------------- */

    setFxError(msg: string) {
        this.errorMessage = msg;
    }

    clearFxError() {
        this.errorMessage = "";
    }
}

export default new Fx991State();
