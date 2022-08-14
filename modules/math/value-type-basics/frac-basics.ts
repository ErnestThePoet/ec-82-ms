import type {
    FracValue,
    DegreeValue,
    TryToFracResult,
    FracDecOpResult,
    FracDegreeOpResult
} from "../../calc-core/types";
import { gcd, lcm } from "../algorithm";
import * as DB from "./dec-basics";
import * as DGB from "./degree-basics";

export function toDec(x: FracValue): number{
    return x.u / x.d;
}

export function toDegree(x: FracValue): DegreeValue {
    return DB.toDegree(toDec(x));
}

// u and d follow same RI as FracValue except u and d may not be int.
export function tryFromTerminatingDiv(u: number, d: number): TryToFracResult{
    const isNegative = (u < 0 && d > 0) || (u > 0 && d < 0);

    u = Math.abs(u);
    d = Math.abs(d);

    const uStrSplitted = u.toString().split(".");
    const dStrSplitted = d.toString().split(".");

    const tensToMul = Math.max((uStrSplitted[1] ?? "").length,
        (dStrSplitted[1] ?? "").length);

    for (let i = 0; i < tensToMul; i++){
        u *= 10;
        d *= 10;

        // after multiplication to integer, both must be safe integers
        if (u >= Number.MAX_SAFE_INTEGER || d >= Number.MAX_SAFE_INTEGER) {
            return {
                ok: false
            };
        }
    }

    return {
        ok: true,
        frac: reduce({ u:isNegative?-u:u, d })
    };
}

export function reduce(x: FracValue):FracValue {
    const fracGcd = gcd(x.u, x.d);
    return {
        u: x.u / fracGcd,
        d: x.d / fracGcd
    };
}

// x must not evaluate to 0.
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

// y must not evaluate to 0.
export function divFrac(x: FracValue, y: FracValue): FracValue{
    return mulFrac(x, invert(y));
}

///////////////////// Operations with decimal /////////////////////
export function addDec(x: FracValue, y: number): FracDecOpResult {
    const decFrac = DB.tryToFracValue(y);

    if (decFrac.ok) {
        return {
            isFrac: true,
            value: addFrac(x, decFrac.frac!)
        };
    }

    return {
        isFrac: false,
        value: toDec(x)+y
    };
}

export function subDec(x: FracValue, y: number): FracDecOpResult {
    return addDec(x, -y);
}

export function mulDec(x: FracValue, y: number): FracDecOpResult {
    const decFrac = DB.tryToFracValue(y);

    if (decFrac.ok) {
        return {
            isFrac: true,
            value: mulFrac(x, decFrac.frac!)
        };
    }

    return {
        isFrac: false,
        value: toDec(x)*y
    };
}

// y must not evaluate to 0.
export function divDec(x: FracValue, y: number): FracDecOpResult {
    const decFrac = DB.tryToFracValue(y);

    if (decFrac.ok) {
        return {
            isFrac: true,
            value: divFrac(x, decFrac.frac!)
        };
    }

    return {
        isFrac: false,
        value: toDec(x)/y
    };
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: FracValue, y: DegreeValue): FracDegreeOpResult {
    const yFrac = DGB.tryToFracValue(y);

    if (!yFrac.ok) {
        return {
            isFrac: false,
            value: toDec(x) + DGB.toDecValue(y)
        };
    }

    return {
        isFrac: true,
        value: addFrac(x, yFrac.frac!)
    };
}

export function subDegree(x: FracValue, y: DegreeValue): FracDegreeOpResult {
    return addDegree(x, { ...y, neg: !y.neg });
}

export function mulDegree(x: FracValue, y: DegreeValue): DegreeValue{
    return DB.toDegree(x.u * DGB.toDecValue(y) / x.d);
}

// y must not evaluate to 0.
export function divDegree(x: FracValue, y: DegreeValue): DegreeValue {
    return DB.toDegree(x.u / x.d / DGB.toDecValue(y));
}