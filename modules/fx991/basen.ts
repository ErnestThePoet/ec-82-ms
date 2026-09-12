import Decimal from "decimal.js";

/**
 * BASE-N (基数/进制) 模式引擎。
 * 支持 DEC / BIN / OCT / HEX 四种基数，整数运算与逻辑运算。
 */

export type BaseRadix = "DEC" | "BIN" | "OCT" | "HEX";

export const BASE_RADICES: BaseRadix[] = ["DEC", "BIN", "OCT", "HEX"];

const RADIX_BASE: Record<BaseRadix, number> = {
    DEC: 10,
    BIN: 2,
    OCT: 8,
    HEX: 16
};

/** 当前基数下的最大位数（FX-991CN X 为 32 位有符号） */
export const BASE_WORD_BITS = 32;

export function radixName(r: BaseRadix): string {
    return r;
}

/** 单个字符是否为当前基数下的合法数字 */
export function isDigitChar(ch: string, r: BaseRadix): boolean {
    const upper = ch.toUpperCase();
    if (upper >= "0" && upper <= "9") {
        const val = upper.charCodeAt(0) - 48;
        return val < RADIX_BASE[r];
    }
    if (upper >= "A" && upper <= "F") {
        const val = upper.charCodeAt(0) - 55;
        return val < RADIX_BASE[r];
    }
    return false;
}

/** 数字字符转数值 */
export function digitValue(ch: string): number {
    const upper = ch.toUpperCase();
    if (upper >= "0" && upper <= "9") {
        return upper.charCodeAt(0) - 48;
    }
    return upper.charCodeAt(0) - 55; // A-F
}

/** 按基数解析数字字符串（可带负号）为 32 位有符号整数 */
export function parseBaseValue(src: string, r: BaseRadix): Decimal {
    let s = src.trim();
    if (s.length === 0) {
        return new Decimal(0);
    }
    let neg = false;
    if (s[0] === "-") {
        neg = true;
        s = s.slice(1);
    }
    if (s.length === 0) {
        throw new Error("Syntax ERROR");
    }

    let val = new Decimal(0);
    const base = RADIX_BASE[r];
    for (const ch of s) {
        if (!isDigitChar(ch, r)) {
            throw new Error("Syntax ERROR");
        }
        val = val.mul(base).plus(digitValue(ch));
    }

    if (neg) {
        val = val.neg();
    }

    // 截断到 32 位有符号范围
    const max = new Decimal(2).pow(BASE_WORD_BITS - 1);
    const min = max.neg();
    if (val.gt(max.minus(1))) {
        // 环绕到有符号范围（模 2^32）
        const mod = new Decimal(2).pow(BASE_WORD_BITS);
        val = val.mod(mod);
        if (val.gte(max)) {
            val = val.minus(mod);
        }
    }
    if (val.lt(min)) {
        const mod = new Decimal(2).pow(BASE_WORD_BITS);
        val = val.mod(mod);
        if (val.lt(min)) {
            val = val.plus(mod);
        }
    }

    return val;
}

/** 将 32 位有符号整数按基数格式化输出 */
export function formatBaseValue(v: Decimal, r: BaseRadix): string {
    if (r === "DEC") {
        return v.toString();
    }

    const max = new Decimal(2).pow(BASE_WORD_BITS - 1);
    let val = v;
    if (val.isNegative()) {
        // 输出补码表示
        const mod = new Decimal(2).pow(BASE_WORD_BITS);
        val = val.plus(mod);
    }
    if (val.gte(max)) {
        // 已经是补码语义，直接转换
    }

    const base = RADIX_BASE[r];
    let s = "";
    let cur = val;
    if (cur.isZero()) {
        s = "0";
    } else {
        while (cur.gt(0)) {
            const d = cur.mod(base).toNumber();
            s = (d < 10 ? String(d) : String.fromCharCode(55 + d)) + s;
            cur = cur.div(base).floor();
        }
    }

    // BIN 最多显示 32 位，OCT 11 位，HEX 8 位（符号位保留）
    const suffix = r === "BIN" ? "b" : r === "OCT" ? "o" : "h";
    return s + suffix;
}

/* ------------------------- 运算 ------------------------- */

export const baseAdd = (a: Decimal, b: Decimal): Decimal => a.plus(b);
export const baseSub = (a: Decimal, b: Decimal): Decimal => a.minus(b);
export const baseMul = (a: Decimal, b: Decimal): Decimal => a.mul(b);

/** 整除（FX-991 的除法为整数除法） */
export const baseDiv = (a: Decimal, b: Decimal): Decimal => {
    if (b.isZero()) {
        throw new Error("Math ERROR");
    }
    return a.div(b).floor();
};

/** 逻辑与 */
export const baseAnd = (a: Decimal, b: Decimal): Decimal =>
    bitwise(a, b, "AND");

function bitwise(a: Decimal, b: Decimal, op: "AND" | "OR" | "XOR" | "XNOR"): Decimal {
    const bits = BASE_WORD_BITS;
    const pow = (n: number) => new Decimal(2).pow(n);
    const max = pow(bits - 1);
    const mod = pow(bits);

    let x = a.mod(mod);
    let y = b.mod(mod);
    if (x.isNegative()) {
        x = x.plus(mod);
    }
    if (y.isNegative()) {
        y = y.plus(mod);
    }

    let result = new Decimal(0);
    for (let i = 0; i < bits; i++) {
        const xi = x.div(pow(i)).mod(2).gte(1) ? 1 : 0;
        const yi = y.div(pow(i)).mod(2).gte(1) ? 1 : 0;
        let r: number;
        switch (op) {
            case "AND":
                r = xi & yi;
                break;
            case "OR":
                r = xi | yi;
                break;
            case "XOR":
                r = xi ^ yi;
                break;
            case "XNOR":
                r = ~(xi ^ yi) & 1;
                break;
        }
        if (r === 1) {
            result = result.plus(pow(i));
        }
    }

    // 有符号化
    if (result.gte(max)) {
        result = result.minus(mod);
    }
    return result;
}

export const baseAndOp = (a: Decimal, b: Decimal): Decimal => bitwise(a, b, "AND");
export const baseOrOp = (a: Decimal, b: Decimal): Decimal => bitwise(a, b, "OR");
export const baseXorOp = (a: Decimal, b: Decimal): Decimal => bitwise(a, b, "XOR");
export const baseXnorOp = (a: Decimal, b: Decimal): Decimal => bitwise(a, b, "XNOR");

/** 按位取反 */
export const baseNotOp = (a: Decimal): Decimal => {
    const mod = new Decimal(2).pow(BASE_WORD_BITS);
    const max = new Decimal(2).pow(BASE_WORD_BITS - 1);
    let x = a.mod(mod);
    if (x.isNegative()) {
        x = x.plus(mod);
    }
    // ~x = 2^32 - 1 - x
    let result = mod.minus(1).minus(x);
    if (result.gte(max)) {
        result = result.minus(mod);
    }
    return result;
};
