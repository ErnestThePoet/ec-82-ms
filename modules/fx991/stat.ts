import Decimal from "decimal.js";

/**
 * STAT (统计) 模式引擎。
 * 单变量统计：录入数据列表，计算 n / x̄ / σx / sx / Σx / Σx²。
 */

export interface StatResult {
    n: number;
    mean: Decimal;
    /** 总体标准差 */
    popStd: Decimal;
    /** 样本标准差 */
    sampleStd: Decimal;
    sum: Decimal;
    sumSq: Decimal;
}

const SIG = 12;

function fmt(d: Decimal): string {
    if (d.isZero()) {
        return "0";
    }
    if (d.abs().gte(new Decimal("1e20"))) {
        return d.toExponential(SIG);
    }
    return d.toSignificantDigits(SIG).toString();
}

export function computeStat(data: Decimal[]): StatResult {
    const n = data.length;
    if (n === 0) {
        return {
            n: 0,
            mean: new Decimal(0),
            popStd: new Decimal(0),
            sampleStd: new Decimal(0),
            sum: new Decimal(0),
            sumSq: new Decimal(0)
        };
    }

    let sum = new Decimal(0);
    let sumSq = new Decimal(0);
    for (const v of data) {
        sum = sum.plus(v);
        sumSq = sumSq.plus(v.mul(v));
    }

    const mean = sum.div(n);
    // 方差 = Σ(x-x̄)²/n = Σx²/n - x̄²
    const variance = sumSq.div(n).minus(mean.mul(mean));
    const popStd = variance.isNegative()
        ? new Decimal(0)
        : variance.sqrt();
    const sampleStd = n > 1
        ? variance.mul(n).div(n - 1).sqrt()
        : new Decimal(0);

    return { n, mean, popStd, sampleStd, sum, sumSq };
}

export const statResultToLines = (r: StatResult): string[] => [
    `n=${r.n}`,
    `x̄=${fmt(r.mean)}`,
    `σx=${fmt(r.popStd)}`,
    `sx=${fmt(r.sampleStd)}`,
    `Σx=${fmt(r.sum)}`,
    `Σx²=${fmt(r.sumSq)}`
];
