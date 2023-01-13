import Decimal from "decimal.js";
import type { FracValue, DegreeValue } from "../../calc-core/objs/types";
import { gcd, lcm } from "../algorithm";
import * as DB from "./dec-basics";
import * as DGB from "./degree-basics";

export function toDecValue(x: FracValue): Decimal {
    return x.u.div(x.d);
}

export function toDegreeValue(x: FracValue): DegreeValue {
    return DB.toDegreeValue(toDecValue(x));
}

// u and d follow same RI as FracValue except u and d may not be int.
export function fromTerminatingDiv(u: Decimal, d: Decimal): FracValue {
    const isNegative = (u.lt(0) && d.gt(0)) || (u.gt(0) && d.lt(0));

    u = u.abs();
    d = d.abs();

    const uStrSplitted = u.toString().split(".");
    const dStrSplitted = d.toString().split(".");

    const tensToMul = Math.max(
        (uStrSplitted[1] ?? "").length,
        (dStrSplitted[1] ?? "").length
    );

    u = u.mul(Decimal.pow(10, tensToMul));
    d = d.mul(Decimal.pow(10, tensToMul));

    return reduce({ u: isNegative ? u.neg() : u, d });
}

export function reduce(x: FracValue): FracValue {
    const fracGcd = gcd(x.u, x.d);
    return {
        u: x.u.div(fracGcd),
        d: x.d.div(fracGcd)
    };
}

// x must not evaluate to 0.
export function invert(x: FracValue): FracValue {
    return {
        u: x.u.lt(0) ? x.d.abs().neg() : x.d.abs(),
        d: x.u.abs()
    };
}

///////////////////// Operations with frac /////////////////////
export function addFrac(x: FracValue, y: FracValue): FracValue {
    const fracLcm = lcm(x.d, y.d);
    const sum: FracValue = {
        u: x.u.mul(fracLcm.div(x.d)).add(y.u.mul(fracLcm.div(y.d))),
        d: fracLcm
    };

    return reduce(sum);
}

export function subFrac(x: FracValue, y: FracValue): FracValue {
    const fracLcm = lcm(x.d, y.d);
    const sum: FracValue = {
        u: x.u.mul(fracLcm.div(x.d)).sub(y.u.mul(fracLcm.div(y.d))),
        d: fracLcm
    };

    return reduce(sum);
}

export function mulFrac(x: FracValue, y: FracValue): FracValue {
    const crossGcd1 = gcd(x.u, y.d);
    const crossGcd2 = gcd(x.d, y.u);

    const product: FracValue = {
        u: x.u.div(crossGcd1).mul(y.u.div(crossGcd2)),
        d: x.d.div(crossGcd2).mul(y.d.div(crossGcd1))
    };

    return reduce(product);
}

// y must not evaluate to 0.
export function divFrac(x: FracValue, y: FracValue): FracValue {
    return mulFrac(x, invert(y));
}

export function intPower(x: FracValue, y: Decimal): FracValue {
    if (y.gte(0)) {
        return reduce({ u: x.u.pow(y), d: x.d.pow(y) });
    } else {
        return reduce({ u: x.d.pow(y.neg()), d: x.u.pow(y.neg()) });
    }
}

///////////////////// Operations with decimal /////////////////////
export function addDec(x: FracValue, y: Decimal): FracValue {
    const decFrac = DB.toFracValue(y);

    return addFrac(x, decFrac);
}

export function subDec(x: FracValue, y: Decimal): FracValue {
    return addDec(x, y.neg());
}

export function mulDec(x: FracValue, y: Decimal): FracValue {
    const decFrac = DB.toFracValue(y);

    return mulFrac(x, decFrac);
}

// y must not evaluate to 0.
export function divDec(x: FracValue, y: Decimal): FracValue {
    const decFrac = DB.toFracValue(y);

    return divFrac(x, decFrac);
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: FracValue, y: DegreeValue): FracValue {
    const yFrac = DGB.toFracValue(y);

    return addFrac(x, yFrac);
}

export function subDegree(x: FracValue, y: DegreeValue): FracValue {
    return addDegree(x, { ...y, neg: !y.neg });
}

export function mulDegree(x: FracValue, y: DegreeValue): FracValue {
    return mulFrac(x, DGB.toFracValue(y));
}

// y must not evaluate to 0.
export function divDegree(x: FracValue, y: DegreeValue): FracValue {
    return divFrac(x, DGB.toFracValue(y));
}
