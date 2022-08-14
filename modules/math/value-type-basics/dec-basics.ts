import type {
    FracValue,
    DegreeValue,
    TryToFracResult,
    FracDecOpResult
} from "../../calc-core/types";
import { isInteger } from "../../calc-core/utils";
import * as FB from "./frac-basics";
import * as DGB from "./degree-basics";

export function tryToFracValue(x: number): TryToFracResult{
    // this handles most non-int cases
    if (!isInteger(x)&&x.toString().replace(".","").length <= 13) {
        return FB.tryFromTerminatingDiv(x, 1);
    }

    const isNegative: boolean = x < 0;
    x = Math.abs(x);

    let intPart = Math.floor(x);

    const addends: number[] = [intPart];

    x -= intPart;
    
    while (x > 0) {
        if (addends.length >= 10) {
            return {
                ok: false
            };
        }
        x = 1 / x;
        intPart = Math.floor(x);
        addends.push(intPart);
        x -= intPart;
    }

    let res: FracValue = { u: addends[addends.length - 1], d: 1 };

    for (let i = addends.length - 2; i >= 0; i--){
        res = FB.addFrac({ u: addends[i], d: 1 }, FB.divFrac({ u: 1, d: 1 }, res));
    }

    if (isNegative) {
        res.u = -res.u;
    }

    return {
        ok: true,
        frac: res
    };
}

export function toDegree(x: number): DegreeValue{
    const neg: boolean = x < 0;
    x = Math.abs(x);
    const d: number = Math.floor(x);
    x -= d;
    x *= 60;
    const m: number = Math.floor(x);
    x -= m;
    x *= 60;
    return {
        d,
        m,
        s: x,
        neg
    };
}
///////////////////// Operations with frac /////////////////////
export function subFrac(x: number, y: FracValue): FracDecOpResult{
    return FB.addDec({ u: -y.u, d: y.d }, x);
}

// y must not evaluate to 0.
export function divFrac(x: number, y: FracValue): FracDecOpResult {
    return FB.mulDec(FB.invert(y), x);
}

///////////////////// Operations with degree /////////////////////
export function addDegree(x: number, y: DegreeValue): number{
    return x + DGB.toDecValue(y);
}

export function subDegree(x: number, y: DegreeValue): number {
    return x - DGB.toDecValue(y);
}

export function mulDegree(x: number, y: DegreeValue): DegreeValue {
    const neg = x >= 0 ? y.neg : !y.neg;

    return DGB.fromDmsNeg(
        y.d * x,
        y.m * x,
        y.s * x,
        neg
    );
}

// y must not evaluate to 0.
export function divDegree(x: number, y: DegreeValue): DegreeValue {
    return toDegree(x / DGB.toDecValue(y));
}