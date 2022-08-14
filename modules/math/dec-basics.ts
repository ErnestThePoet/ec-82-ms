import { FracValue, DegreeValue } from "../calc-core/types";
import * as FB from "./frac-basics";

export function tryToFracValue(x: number): {ok:boolean,frac?:FracValue}{
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