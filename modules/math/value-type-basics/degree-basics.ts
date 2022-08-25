import Decimal from "decimal.js";
import type {
    FracValue,
    DegreeValue
} from "../../calc-core/objs/types";
import * as DB from "./dec-basics";
import * as FB from "./frac-basics";

export function isAbsGreaterThan(x: DegreeValue, y: DegreeValue): boolean{
    if (x.d.gt(y.d)) {
        return true;
    }
    else if (x.d.lt(y.d)) {
        return false;
    }
    
    if (x.m.gt(y.m)) {
        return true;
    }
    else if (x.m.lt(y.m)) {
        return false;
    }

    if (x.s.gt(y.s)) {
        return true;
    }
    else {
        return false;
    }
}

export function toDecValue(x: DegreeValue): Decimal {
    const decAbs = x.d.add(x.m.div(60)).add(x.s.div(3600));
    return x.neg ? decAbs.neg() : decAbs;
}

export function toFracValue(x: DegreeValue): FracValue{
    const sFrac = FB.fromTerminatingDiv(x.s, new Decimal(3600));
    
    const res = FB.addFrac(sFrac,
        FB.addDec({ u: x.m, d: new Decimal(60) }, x.d));
    
    if (x.neg) {
        res.u = res.u.neg();
    }

    return res;
}

// d,m,s only need to be non-negative.
export function fromDmsNeg(d: Decimal, m: Decimal, s: Decimal, neg: boolean): DegreeValue {
    // step 1: make d and m integers
    m = m.add(d.mod(1).mul(60));
    d = d.floor();

    s = s.add(m.mod(1).mul(60));
    m = m.floor();

    // step 2: reduce m and s
    m =m.add(s.div(60).floor());
    s =s.mod(60);
    d =d.add(m.div(60).floor());
    m=m.mod(60);

    return {
        d, m, s, neg
    };
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: DegreeValue, y: DegreeValue): DegreeValue{
    if (x.neg && y.neg) {
        return fromDmsNeg(x.d.add(y.d), x.m.add(y.m), x.s.add(y.s), true);
    }
    else if (!x.neg && !y.neg) {
        return fromDmsNeg(x.d.add(y.d), x.m.add(y.m), x.s.add(y.s), false);
    }
    else {
        // make sure x.neg && !y.neg
        if (y.neg && !x.neg) {
            const t = y;
            y = x;
            x = t;
        }

        if (isAbsGreaterThan(x, y)) {
            let s = x.s.sub(y.s);
            let m = x.m.sub(y.m);
            let d = x.d.sub(y.d);

            if (s.lt(0)) {
                m=m.sub(1);
                s=s.add(60);
            }

            if (m.lt(0)) {
                d=d.sub(1);
                m=m.add(60);
            }

            d = d.abs();

            return { d, m, s, neg: true };
        }
        else {
            let s = y.s.sub(x.s);
            let m = y.m.sub(x.m);
            let d = y.d.sub(x.d);

            if (s.lt(0)) {
                m=m.sub(1);
                s=s.add(60);
            }

            if (m.lt(0)) {
                d=d.sub(1);
                m=m.add(60);
            }

            d = d.abs();

            return { d, m, s, neg: false };
        }
    }
}

export function subDegree(x: DegreeValue, y: DegreeValue): DegreeValue{
    return addDegree(x, { ...y, neg: !y.neg });
}

export function mulDegree(x: DegreeValue, y: DegreeValue): Decimal{
    return toDecValue(x).mul(toDecValue(y));
}

export function divDegree(x: DegreeValue, y: DegreeValue): FracValue {
    return FB.divFrac(toFracValue(x), toFracValue(y));
}

///////////////////// Operations with dec /////////////////////
export function subDec(x: DegreeValue, y: Decimal): Decimal {
    return DB.addDegree(y.neg(), x);
}

// y must not evaluate to 0.
export function divDec(x: DegreeValue, y: Decimal): FracValue {
    return FB.divDec(toFracValue(x),y);
}

///////////////////// Operations with frac /////////////////////
export function subFrac(x: DegreeValue, y: FracValue): FracValue {
    return FB.addDegree({ u: y.u.neg(), d: y.d },x);
}

// y must not evaluate to 0.
export function divFrac(x: DegreeValue, y: FracValue): FracValue {
    return FB.divFrac(toFracValue(x),y);
}