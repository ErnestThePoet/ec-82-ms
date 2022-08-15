// Internal number math functions' responsibility is to:
// 1. calculate InternalNumbers that are guarenteed to be valid for the operation;
// 2. modify E and F in calculator memory for Pol and Rec.

import * as FACT from "./calculations/fact";
import * as NCRNPR from "./calculations/ncr-npr";
import * as DB from "./value-type-basics/dec-basics";
import * as FB from "./value-type-basics/frac-basics";
import * as DGB from "./value-type-basics/degree-basics";
import * as FNC from "./operation-fn-creators";
import { isInteger } from "../calc-core/utils";
import type { OperationFn } from "../calc-core/types";
import { InternalNumber } from "../calc-core/internal-number";
import calculatorState from "../../observables/calculator-state";
import calculatorMemory from "../../observables/calculator-memory";

export function getDecValue(x: InternalNumber): number{
    switch (x.type) {
        case "DEC":
            return x.dec;
        case "FRAC":
            return FB.toDecValue(x.frac);
        case "DEGREE":
            return DGB.toDecValue(x.degree);
    }
}

export const cbrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", Math.cbrt(x.dec));
        case "FRAC":
            const tryFrac = FB.tryFromTerminatingDiv(Math.cbrt(x.frac.u), Math.cbrt(x.frac.d));
            if (tryFrac.ok) {
                return new InternalNumber("FRAC", tryFrac.frac!);
            }
            return new InternalNumber("DEC", Math.cbrt(FB.toDecValue(x.frac)));
        case "DEGREE":
            return new InternalNumber("DEC", Math.cbrt(DGB.toDecValue(x.degree)));
    }
}

export const sqrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", Math.sqrt(x.dec));
        case "FRAC":
            const tryFrac = FB.tryFromTerminatingDiv(Math.sqrt(x.frac.u), Math.sqrt(x.frac.d));
            if (tryFrac.ok) {
                return new InternalNumber("FRAC", tryFrac.frac!);
            }
            return new InternalNumber("DEC", Math.sqrt(FB.toDecValue(x.frac)));
        case "DEGREE":
            return new InternalNumber("DEC", Math.sqrt(DGB.toDecValue(x.degree)));
    }
}

export const log: OperationFn = FNC.createDecUnaryOpFn(Math.log10);
export const ln: OperationFn = FNC.createDecUnaryOpFn(Math.log);
export const exp10: OperationFn = FNC.createDecUnaryOpFn((x: number) => 10 ** x);
export const exp: OperationFn = FNC.createDecUnaryOpFn(Math.exp);

export const sin: OperationFn = FNC.createTriangleOpFn(Math.sin);
export const cos: OperationFn = FNC.createTriangleOpFn(Math.cos);
export const tan: OperationFn = FNC.createTriangleOpFn(Math.tan);

export const sinh: OperationFn = FNC.createDecUnaryOpFn(Math.sinh);
export const cosh: OperationFn = FNC.createDecUnaryOpFn(Math.cosh);
export const tanh: OperationFn = FNC.createDecUnaryOpFn(Math.tanh);

export const asin: OperationFn = FNC.createDecUnaryOpFn(Math.asin);
export const acos: OperationFn = FNC.createDecUnaryOpFn(Math.acos);
export const atan: OperationFn = FNC.createDecUnaryOpFn(Math.atan);

export const fact: OperationFn = FNC.createDecUnaryOpFn(FACT.fact);
export const inv: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", 1 / x.dec);
        case "FRAC":
            return new InternalNumber("FRAC", FB.invert(x.frac));
        case "DEGREE":
            return new InternalNumber("DEC", 1 / DGB.toDecValue(x.degree));
    }
}
export const cube: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec**3);
        case "FRAC":
            return new InternalNumber("FRAC", FB.intPower(x.frac,3));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree)**3);
    }
}
export const sqr: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec ** 2);
        case "FRAC":
            return new InternalNumber("FRAC", FB.intPower(x.frac, 2));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree) ** 2);
    }
}
export const percent: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec*100);
        case "FRAC":
            return new InternalNumber("FRAC", FB.mulDec(x.frac,100).value!);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree) *100);
    }
}

export const nCr: OperationFn = FNC.createDecBinaryOpFn(NCRNPR.nCr);
export const nPr: OperationFn = FNC.createDecBinaryOpFn(NCRNPR.nPr);

export const pow: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const yDec = getDecValue(y);
    
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec ** yDec);
        case "FRAC":
            
            if (isInteger(yDec)) {
                return new InternalNumber("FRAC", FB.intPower(x.frac, yDec));
            }
            return new InternalNumber("DEC", FB.toDecValue(x.frac) ** yDec);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree) ** yDec);
    }
}