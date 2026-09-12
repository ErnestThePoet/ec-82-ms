import Decimal from "decimal.js";

/**
 * EQN (方程) 模式引擎。
 * 支持：一元二次、一元三次、二元一次方程组、三元一次方程组。
 * 系数为实数，结果可能是复数（以字符串形式标记 i）。
 */

export type EqnType = "QUAD" | "CUBIC" | "LINEAR2" | "LINEAR3";

export const EQN_TYPES: EqnType[] = ["QUAD", "CUBIC", "LINEAR2", "LINEAR3"];

export interface EqnResult {
    /** 每个未知数的解；复数时以 "a+bi" 字符串表达 */
    roots: string[];
    /** 信息（例如"重根"、"无实数解"等） */
    info?: string;
}

const SIG = 15;

function fmt(d: Decimal): string {
    if (d.isZero()) {
        return "0";
    }
    if (d.abs().lt(new Decimal("1e-15"))) {
        return "0";
    }
    if (d.abs().gte(new Decimal("1e20"))) {
        return d.toExponential(SIG);
    }
    return d.toSignificantDigits(SIG).toString();
}

/** 实根 */
function realRoot(re: Decimal, im: Decimal): string {
    return im.abs().lt(new Decimal("1e-15")) ? fmt(re) : fmt(re) + "+" + fmt(im) + "i";
}

/**
 * 一元二次 ax²+bx+c=0
 */
export function solveQuadratic(a: Decimal, b: Decimal, c: Decimal): EqnResult {
    if (a.isZero()) {
        if (b.isZero()) {
            return { roots: [], info: "NO SOLUTION" };
        }
        return { roots: [fmt(c.neg().div(b))] };
    }
    const disc = b.mul(b).minus(a.mul(c).mul(4));
    const twoA = a.mul(2);
    if (disc.isNegative()) {
        const re = b.neg().div(twoA);
        const im = disc.neg().sqrt().div(twoA);
        return {
            roots: [realRoot(re, im), realRoot(re, im.neg())],
            info: "COMPLEX"
        };
    }
    const sq = disc.sqrt();
    const x1 = b.neg().plus(sq).div(twoA);
    const x2 = b.neg().minus(sq).div(twoA);
    const info = x1.eq(x2) ? "REPEATED ROOT" : undefined;
    return { roots: [fmt(x1), fmt(x2)], info };
}

/**
 * 一元三次 ax³+bx²+cx+d=0
 * 使用卡尔丹公式（复数域），输出 3 个根。
 */
export function solveCubic(a: Decimal, b: Decimal, c: Decimal, d: Decimal): EqnResult {
    if (a.isZero()) {
        return solveQuadratic(b, c, d);
    }

    // 归一化 x³ + px + q = 0
    const p = b.div(a).minus(c.mul(c).div(a.mul(a).mul(3)));
    const q =
        b.mul(c).mul(2).div(a.mul(a).mul(3)).minus(b.mul(b).mul(b).div(a.mul(a).mul(a).mul(27))).minus(d.div(a));

    const p3 = p.div(3);
    const q2 = q.div(2);
    const disc = q2.mul(q2).plus(p3.mul(p3).mul(p3));

    const third = new Decimal(1).div(3);

    const cubert = (x: Decimal): Decimal => {
        if (x.isNegative()) {
            return x.neg().pow(third).neg();
        }
        return x.pow(third);
    };

    let u: Decimal;
    let v: Decimal;
    if (disc.isNegative()) {
        // 三角法（三个实根）：用 Math 三角计算后包装回 Decimal
        const r = p.neg().div(3).sqrt();
        const phi = Math.acos(
            Math.max(-1, Math.min(1, q.div(2).div(r.pow(3)).toNumber()))
        );
        const k = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
        const shift = b.div(a).div(3);
        return {
            roots: k.map(kk =>
                fmt(new Decimal(2 * r.toNumber() * Math.cos(phi + kk)).minus(shift))
            )
        };
    } else {
        u = cubert(q2.neg().plus(disc.sqrt()));
        v = cubert(q2.neg().minus(disc.sqrt()));
    }

    const y1 = u.plus(v);

    // 虚部处理
    if (disc.gt(0)) {
        // 一个实根 + 两个复根
        const y2re = u.plus(v).div(-2);
        const y2im = u.minus(v).mul(new Decimal(3).sqrt()).div(2);
        const shift = b.div(a).div(3);
        return {
            roots: [
                fmt(y1.minus(shift)),
                realRoot(y2re.minus(shift), y2im),
                realRoot(y2re.minus(shift), y2im.neg())
            ]
        };
    }

    // disc == 0：三重实根或二重根
    const shift = b.div(a).div(3);
    return {
        roots: [fmt(y1.minus(shift)), fmt(y1.minus(shift)), fmt(y1.minus(shift))],
        info: "REPEATED ROOT"
    };
}

/**
 * 二元一次方程组：
 * a1 x + b1 y = c1
 * a2 x + b2 y = c2
 */
export function solveLinear2(
    a1: Decimal, b1: Decimal, c1: Decimal,
    a2: Decimal, b2: Decimal, c2: Decimal
): EqnResult {
    const det = a1.mul(b2).minus(a2.mul(b1));
    if (det.isZero()) {
        return { roots: [], info: "NO UNIQUE SOLUTION" };
    }
    const x = c1.mul(b2).minus(c2.mul(b1)).div(det);
    const y = a1.mul(c2).minus(a2.mul(c1)).div(det);
    return { roots: [fmt(x), fmt(y)] };
}

/**
 * 三元一次方程组（高斯消元）：
 * a1 x + b1 y + c1 z = d1
 * a2 x + b2 y + c2 z = d2
 * a3 x + b3 y + c3 z = d3
 */
export function solveLinear3(
    a1: Decimal, b1: Decimal, c1: Decimal, d1: Decimal,
    a2: Decimal, b2: Decimal, c2: Decimal, d2: Decimal,
    a3: Decimal, b3: Decimal, c3: Decimal, d3: Decimal
): EqnResult {
    // 构造增广矩阵
    let m: Decimal[][] = [
        [a1, b1, c1, d1],
        [a2, b2, c2, d2],
        [a3, b3, c3, d3]
    ];

    const n = 3;
    for (let col = 0; col < n; col++) {
        // 选主元
        let pivot = col;
        for (let row = col + 1; row < n; row++) {
            if (m[row][col].abs().gt(m[pivot][col].abs())) {
                pivot = row;
            }
        }
        if (m[pivot][col].isZero()) {
            return { roots: [], info: "NO UNIQUE SOLUTION" };
        }
        [m[col], m[pivot]] = [m[pivot], m[col]];

        // 消去下方
        for (let row = col + 1; row < n; row++) {
            const factor = m[row][col].div(m[col][col]);
            for (let k = col; k <= n; k++) {
                m[row][k] = m[row][k].minus(factor.mul(m[col][k]));
            }
        }
    }

    // 回代
    const x = new Array<Decimal>(n);
    for (let row = n - 1; row >= 0; row--) {
        let sum = m[row][n];
        for (let k = row + 1; k < n; k++) {
            sum = sum.minus(m[row][k].mul(x[k]));
        }
        x[row] = sum.div(m[row][row]);
    }

    return { roots: x.map(v => fmt(v)) };
}
