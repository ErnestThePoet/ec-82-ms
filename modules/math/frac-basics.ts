import { FracValue, DegreeValue } from "../calc-core/types";
import { gcd, lcm } from "./algorithm";
import * as DB from "./dec-basics";
import * as DGB from "./degree-basics";

export function toDec(x: FracValue): number{
    return x.u / x.d;
}

export function toDegree(x: FracValue): DegreeValue {
    return DB.toDegree(toDec(x));
}

export function trimSign(x: FracValue): FracValue{
    const isNegative = (x.d < 0 && x.u > 0) || (x.d > 0 && x.u < 0);
    return {
        u: isNegative ? -Math.abs(x.u) : Math.abs(x.u),
        d: Math.abs(x.d)
    };
}

export function reduce(x: FracValue):FracValue {
    const fracGcd = gcd(x.u, x.d);
    return {
        u: x.u / fracGcd,
        d: x.d / fracGcd
    };
}

export function invert(x: FracValue): FracValue{
    return {
        u: x.d,
        d: x.u
    };
}

///////////////////// Operations with frac /////////////////////
export function addFrac(x: FracValue, y: FracValue): FracValue{
    const fracLcm = lcm(x.d, y.d);
    const sum: FracValue = {
        u: x.u * (fracLcm / x.d) + y.u * (fracLcm / y.d),
        d: fracLcm
    };

    return reduce(sum);
}

export function subFrac(x: FracValue, y: FracValue): FracValue {
    const fracLcm = lcm(x.d, y.d);
    const sum: FracValue = {
        u: x.u * (fracLcm / x.d) - y.u * (fracLcm / y.d),
        d: fracLcm
    };

    return reduce(sum);
}

export function mulFrac(x: FracValue, y: FracValue): FracValue {
    const crossGcd1 = gcd(x.u, y.d);
    const crossGcd2 = gcd(x.d, y.u);

    const product: FracValue = {
        u: (x.u / crossGcd1) * (y.u / crossGcd2),
        d: (x.d / crossGcd2) * (y.d / crossGcd1)
    };

    return reduce(product);
}

// y most not evaluate to 0.
export function divFrac(x: FracValue, y: FracValue): FracValue{
    return mulFrac(x, invert(y));
}

///////////////////// Operations with decimal /////////////////////
export function addDec(x: FracValue, y: number): {
    isFrac: boolean;
    y:FracValue|number
} {
    const decFrac = DB.tryToFracValue(y);

    if (decFrac.ok) {
        return {
            isFrac: true,
            y: addFrac(x, decFrac.frac!)
        };
    }

    return {
        isFrac: false,
        
    }
}

export function subDec(x: FracValue, y: number): FracValue {
    const decFrac: FracValue = {
        u: x.d * y,
        d: x.d
    };

    return subFrac(x, decFrac);
}

export function mulDec(x: FracValue, y: number): FracValue {
    return mulFrac(x, { u: y, d: 1 });
}

// y most not evaluate to 0.
export function divDec(x: FracValue, y: number): FracValue {
    return mulFrac(x, { u: 1, d: y });
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: FracValue, y: DegreeValue): FracValue {
    return addFrac(x, DGB.toFracValue(y));
}

export function subDegree(x: FracValue, y: DegreeValue): FracValue {
    return subFrac(x, DGB.toFracValue(y));
}
