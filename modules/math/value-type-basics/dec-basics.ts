import Decimal from "decimal.js";
import type { FracValue, DegreeValue } from "../../calc-core/objs/types";
import * as FB from "./frac-basics";
import * as DGB from "./degree-basics";

export function toFracValue(x: Decimal): FracValue {
    return FB.fromTerminatingDiv(x, new Decimal(1));
}

export function toDegreeValue(x: Decimal): DegreeValue {
    const neg: boolean = x.lt(0);
    x = x.abs();
    const d: Decimal = x.floor();
    x = x.sub(d);
    x = x.mul(60);
    const m: Decimal = x.floor();
    x = x.sub(m);
    x = x.mul(60);
    return {
        d,
        m,
        s: x,
        neg
    };
}
///////////////////// Operations with dec /////////////////////
// fraction optimization
export function divDec(x: Decimal, y: Decimal): FracValue {
    return FB.fromTerminatingDiv(x, y);
}

///////////////////// Operations with frac /////////////////////
export function subFrac(x: Decimal, y: FracValue): FracValue {
    return FB.addDec({ u: y.u.neg(), d: y.d }, x);
}

// y must not evaluate to 0.
export function divFrac(x: Decimal, y: FracValue): FracValue {
    return FB.mulDec(FB.invert(y), x);
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: Decimal, y: DegreeValue): Decimal {
    return x.add(DGB.toDecValue(y));
}

export function subDegree(x: Decimal, y: DegreeValue): Decimal {
    return x.sub(DGB.toDecValue(y));
}

export function mulDegree(x: Decimal, y: DegreeValue): DegreeValue {
    const neg = x.gte(0) ? y.neg : !y.neg;

    return DGB.fromDmsNeg(y.d.mul(x), y.m.mul(x), y.s.mul(x), neg);
}

// y must not evaluate to 0.
export function divDegree(x: Decimal, y: DegreeValue): FracValue {
    return divFrac(x, DGB.toFracValue(y));
}
