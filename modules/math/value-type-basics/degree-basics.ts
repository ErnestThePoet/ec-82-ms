import type {
    FracValue,
    DegreeValue,
    TryToFracResult,
    FracDegreeOpResult
} from "../../calc-core/types";
import * as DB from "./dec-basics";
import * as FB from "./frac-basics";

export function isAbsGreaterThan(x: DegreeValue, y: DegreeValue): boolean{
    if (x.d > y.d) {
        return true;
    }
    else if (x.d < y.d) {
        return false;
    }
    
    if (x.m > y.m) {
        return true;
    }
    else if (x.m < y.m) {
        return false;
    }

    if (x.s > y.s) {
        return true;
    }
    else {
        return false;
    }
}

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

///////////////////// Operations with degree /////////////////////
export function addDegree(x: DegreeValue, y: DegreeValue): DegreeValue{
    if (x.neg && y.neg) {
        return fromDmsNeg(x.d + y.d, x.m + y.m, x.s + y.s, true);
    }
    else if (!x.neg && !y.neg) {
        return fromDmsNeg(x.d + y.d, x.m + y.m, x.s + y.s, false);
    }
    else {
        // make sure x.neg && !y.neg
        if (y.neg && !x.neg) {
            const t = y;
            y = x;
            x = t;
        }

        if (isAbsGreaterThan(x, y)) {
            let s = x.s - y.s;
            let m = x.m - y.m;
            let d = x.d - y.d;

            if (s < 0) {
                m--;
                s += 60;
            }

            if (m < 0) {
                d--;
                m += 60;
            }

            d = Math.abs(d);

            return { d, m, s, neg: true };
        }
        else {
            let s = y.s - x.s;
            let m = y.m - x.m;
            let d = y.d - x.d;

            if (s < 0) {
                m--;
                s += 60;
            }

            if (m < 0) {
                d--;
                m += 60;
            }

            d = Math.abs(d);

            return { d, m, s, neg: false };
        }
    }
}

export function subDegree(x: DegreeValue, y: DegreeValue): DegreeValue{
    return addDegree(x, { ...y, neg: !y.neg });
}

export function mulDegree(x: DegreeValue, y: DegreeValue): number{
    return toDecValue(x) * toDecValue(y);
}

export function divDegree(x: DegreeValue, y: DegreeValue): number {
    return toDecValue(x) / toDecValue(y);
}

///////////////////// Operations with dec /////////////////////
export function subDec(x: DegreeValue, y: number): number {
    return DB.addDegree(-y, x);
}

// y must not evaluate to 0.
export function divDec(x: DegreeValue, y: number): DegreeValue {
    return fromDmsNeg(x.d / y, x.m / y, x.s / y, x.neg);
}

///////////////////// Operations with frac /////////////////////
export function subFrac(x: DegreeValue, y: FracValue): FracDegreeOpResult {
    return FB.addDegree({ u: -y.u, d: y.d },x);
}

// y must not evaluate to 0.
export function divFrac(x: DegreeValue, y: FracValue): DegreeValue {
    return FB.mulDegree(FB.invert(y), x);
}