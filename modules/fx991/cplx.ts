import Decimal from "decimal.js";

/**
 * CMPLX (复数) 模式引擎。
 * 复数以直角坐标 (re, im) 表示，全部运算基于 decimal.js。
 */

export interface Cplx {
    re: Decimal;
    im: Decimal;
}

export const cplx = (re: Decimal | number, im: Decimal | number): Cplx => ({
    re: new Decimal(re),
    im: new Decimal(im)
});

export const CPLX_ZERO: Cplx = cplx(0, 0);
export const CPLX_ONE: Cplx = cplx(1, 0);
export const CPLX_I: Cplx = cplx(0, 1);

export const cplxAdd = (a: Cplx, b: Cplx): Cplx =>
    cplx(a.re.plus(b.re), a.im.plus(b.im));

export const cplxSub = (a: Cplx, b: Cplx): Cplx =>
    cplx(a.re.minus(b.re), a.im.minus(b.im));

export const cplxMul = (a: Cplx, b: Cplx): Cplx =>
    cplx(
        a.re.mul(b.re).minus(a.im.mul(b.im)),
        a.re.mul(b.im).plus(a.im.mul(b.re))
    );

export const cplxDiv = (a: Cplx, b: Cplx): Cplx => {
    const denom = b.re.mul(b.re).plus(b.im.mul(b.im));
    if (denom.isZero()) {
        throw new Error("Math ERROR");
    }
    return cplx(
        a.re.mul(b.re).plus(a.im.mul(b.im)).div(denom),
        a.im.mul(b.re).minus(a.re.mul(b.im)).div(denom)
    );
};

export const cplxNeg = (a: Cplx): Cplx => cplx(a.re.neg(), a.im.neg());

/** |z| */
export const cplxAbs = (a: Cplx): Decimal =>
    a.re.mul(a.re).plus(a.im.mul(a.im)).sqrt();

/** arg(z) 弧度 */
export const cplxArg = (a: Cplx): Decimal => {
    if (a.re.isZero() && a.im.isZero()) {
        throw new Error("Math ERROR");
    }
    // decimal.js 无 atan2，用 Math 计算后包装（精度足够显示）
    return new Decimal(
        Math.atan2(a.im.toNumber(), a.re.toNumber())
    );
};

/** 共轭 */
export const cplxConj = (a: Cplx): Cplx => cplx(a.re, a.im.neg());

/** 实部 / 虚部提取 */
export const cplxReal = (a: Cplx): Decimal => a.re;
export const cplxImag = (a: Cplx): Decimal => a.im;

/** 模/幅角极坐标 (FX-991 的 r∠θ) */
export const cplxPolar = (a: Cplx): Cplx =>
    cplx(cplxAbs(a), cplxArg(a));

const DISP_SIG = 20;

function fmt(d: Decimal): string {
    if (d.isZero()) {
        return "0";
    }
    if (d.abs().lt(new Decimal("1e-20"))) {
        return "0";
    }
    if (d.abs().gte(new Decimal("1e20"))) {
        return d.toExponential(DISP_SIG);
    }
    return d.toSignificantDigits(DISP_SIG).toString();
}

/**
 * a+bi 形式显示。支持 "a+bi" | "r∠θ" 两种。
 */
export function cplxToString(c: Cplx, polar: boolean = false): string {
    if (polar) {
        return `${fmt(cplxAbs(c))}∠${fmt(cplxArg(c))}`;
    }

    const reStr = fmt(c.re);
    if (c.im.isZero()) {
        return reStr;
    }

    const imStr = fmt(c.im.abs());
    if (c.re.isZero()) {
        return imStr + "i";
    }

    return c.im.isNegative() ? `${reStr}-${imStr}i` : `${reStr}+${imStr}i`;
}

/* ------------------------------------------------------------------ */
/* 简单表达式解析器：支持数字、i、+ - * / ( ) 和一元负号                */
/* ------------------------------------------------------------------ */

type Token =
    | { t: "NUM"; v: Decimal }
    | { t: "I" }
    | { t: "OP"; v: string } // + - * /
    | { t: "LP" }
    | { t: "RP" }
    | { t: "END" };

function tokenize(src: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < src.length) {
        const ch = src[i];
        if (ch === " ") {
            i++;
            continue;
        }
        if (ch >= "0" && ch <= "9") {
            let num = "";
            while (i < src.length && /[0-9.]/.test(src[i])) {
                num += src[i];
                i++;
            }
            // 处理形如 .5 的输入
            if (num === ".") {
                num = "0";
            }
            if ((num.match(/\./g) || []).length > 1) {
                throw new Error("Syntax ERROR");
            }
            tokens.push({ t: "NUM", v: new Decimal(num) });
            continue;
        }
        if (ch === "i" || ch === "I") {
            tokens.push({ t: "I" });
            i++;
            continue;
        }
        if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
            tokens.push({ t: "OP", v: ch });
            i++;
            continue;
        }
        if (ch === "(") {
            tokens.push({ t: "LP" });
            i++;
            continue;
        }
        if (ch === ")") {
            tokens.push({ t: "RP" });
            i++;
            continue;
        }
        throw new Error("Syntax ERROR");
    }
    tokens.push({ t: "END" });
    return tokens;
}

class CplxParser {
    private pos = 0;
    constructor(private tokens: Token[]) {}

    private peek(): Token {
        return this.tokens[this.pos];
    }
    private next(): Token {
        return this.tokens[this.pos++];
    }

    parse(): Cplx {
        const v = this.parseExpr();
        if (this.peek().t !== "END") {
            throw new Error("Syntax ERROR");
        }
        return v;
    }

    private parseExpr(): Cplx {
        let v = this.parseTerm();
        for (;;) {
            const t = this.peek();
            if (t.t === "OP" && (t.v === "+" || t.v === "-")) {
                this.next();
                const rhs = this.parseTerm();
                v = t.v === "+" ? cplxAdd(v, rhs) : cplxSub(v, rhs);
            } else {
                return v;
            }
        }
    }

    private parseTerm(): Cplx {
        let v = this.parseFactor();
        for (;;) {
            const t = this.peek();
            if (t.t === "OP" && (t.v === "*" || t.v === "/")) {
                this.next();
                const rhs = this.parseFactor();
                v = t.v === "*" ? cplxMul(v, rhs) : cplxDiv(v, rhs);
            } else {
                return v;
            }
        }
    }

    private parseFactor(): Cplx {
        const t = this.peek();
        if (t.t === "OP" && t.v === "-") {
            this.next();
            return cplxNeg(this.parseFactor());
        }
        if (t.t === "OP" && t.v === "+") {
            this.next();
            return this.parseFactor();
        }
        if (t.t === "NUM") {
            this.next();
            // 隐式乘：2i / 2(3+i)
            const n = this.tryImplicitMul();
            return n ? cplxMul(cplx(t.v, 0), n) : cplx(t.v, 0);
        }
        if (t.t === "I") {
            this.next();
            const n = this.tryImplicitMul();
            return n ? cplxMul(CPLX_I, n) : CPLX_I;
        }
        if (t.t === "LP") {
            this.next();
            const v = this.parseExpr();
            if (this.peek().t !== "RP") {
                throw new Error("Syntax ERROR");
            }
            this.next();
            const n = this.tryImplicitMul();
            return n ? cplxMul(v, n) : v;
        }
        throw new Error("Syntax ERROR");
    }

    /** 括号/数字/i 紧跟在因子后时视为乘法 */
    private tryImplicitMul(): Cplx | null {
        const t = this.peek();
        if (t.t === "NUM" || t.t === "I" || t.t === "LP") {
            return this.parseFactor();
        }
        return null;
    }
}

/** 解析字符串为复数，例如 "2+3i"、"i"、"(1+i)(2-i)" */
export function parseCplx(src: string): Cplx {
    const tokens = tokenize(src);
    return new CplxParser(tokens).parse();
}
