import type {
    FracValue,
    DegreeValue,
    TryToFracResult,
    FracDegreeOpResult
} from "../../calc-core/types";
import * as DB from "./dec-basics";
import * as FB from "./frac-basics";

export function toDecValue(x: DegreeValue): number {
    const decAbs = x.d + x.m / 60 + x.s / 3600;
    return x.neg ? -decAbs : decAbs;
}

export function tryToFracValue(x: DegreeValue): TryToFracResult{
    const sFrac = FB.tryFromTerminatingDiv(x.s, 3600);
    if (!sFrac.ok) {
        return {
            ok: false
        };
    }

    const res = FB.addFrac(sFrac.frac!,
        <FracValue>(FB.addDec({ u: x.m, d: 60 }, x.d).value!));
    
    if (x.neg) {
        res.u = -res.u;
    }

    return {
        ok: true,
        frac: res
    };
}

// d,m,s only need to be non-negative.
export function fromDmsNeg(d: number, m: number, s: number, neg: boolean): DegreeValue {
    // step 1: make d and m integers
    // if d=1.2, then d%1 got 0.200000...
    m += parseFloat(`0.${d.toString().split(".")[1]??"0"}`) * 60;
    d = Math.floor(d);

    s += parseFloat(`0.${m.toString().split(".")[1] ?? "0"}`) * 60;
    m = Math.floor(m);

    // step 2: reduce m and s
    m += Math.floor(s / 60);
    s %= 60;
    d += Math.floor(m / 60);
    m %= 60;

    return {
        d, m, s, neg
    };
}

///////////////////// Operations with dec /////////////////////
export function subDec(x: DegreeValue, y: number): number {
    return DB.addDegree(-y, x);
}

// y must not evaluate to 0.
export function divDec(x: DegreeValue, y: number): DegreeValue {
    return {
        d: x.d / y,
        m: x.m / y,
        s: x.s / y,
        neg: x.neg
    };
}

///////////////////// Operations with frac /////////////////////
export function subFrac(x: DegreeValue, y: FracValue): FracDegreeOpResult {
    return FB.addDegree({ u: -y.u, d: y.d },x);
}

// y must not evaluate to 0.
export function divFrac(x: DegreeValue, y: FracValue): DegreeValue {
    return FB.mulDegree(FB.invert(y), x);
}