// both m and n needs to be integers.
// always return positive or 0.
export function gcd(m: number, n: number): number{
    m = Math.abs(m);
    n = Math.abs(n);

    while (n > 0) {
        const t = m % n;
        m = n;
        n = t;
    }
    return m;
}

// always return positive or 0.
export function lcm(m: number, n: number): number{
    if (m === 0 && n === 0) {
        return 0;
    }

    m = Math.abs(m);
    n = Math.abs(n);

    return (m / gcd(m, n)) * n;
}