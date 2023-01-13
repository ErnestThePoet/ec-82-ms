import Decimal from "decimal.js";
// both m and n needs to be integers.
// always return positive or 0.
export function gcd(m: Decimal, n: Decimal): Decimal {
    m = m.abs();
    n = n.abs();

    while (n.gt(0)) {
        const t = m.mod(n);
        m = n;
        n = t;
    }
    return m;
}

// always return positive or 0.
export function lcm(m: Decimal, n: Decimal): Decimal {
    if (m.isZero() && n.isZero()) {
        return new Decimal(0);
    }

    m = m.abs();
    n = n.abs();

    return m.div(gcd(m, n)).mul(n);
}
