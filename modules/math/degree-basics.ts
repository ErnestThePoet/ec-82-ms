import { FracType } from "../calc-core/numerical-types/frac-type";
import { DegreeType } from "../calc-core/numerical-types/degree-type";
import * as FB from "./frac-basics";

export function toDecValue(x: DegreeType): number {
    return x.d + x.m / 60 + x.s / 3600;
}

export function toFracValue(x: DegreeType): FracType{
    return FB.addFrac(FB.addDec({ u: x.m, d: 60 }, x.d), { u: x.s, d: 3600 });
}

export function mulFrac(degree: DegreeType, value:FracType ): DegreeType {
    return mulFrac(frac, { u: value, d: 1 });
}

// value most not evaluate to 0.
export function divFrac(degree: DegreeType, value:FracType ): DegreeType {
    return mulFrac(frac, { u: 1, d: value });
}