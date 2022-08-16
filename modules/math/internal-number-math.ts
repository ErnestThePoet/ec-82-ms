// Internal number math functions' responsibility is to:
// 1. calculate InternalNumbers that are guarenteed to be valid for the operation;
// 2. modify E and F in calculator memory for Pol and Rec.

import Decimal from "decimal.js";
import * as FACT from "./calculations/fact";
import * as NCRNPR from "./calculations/ncr-npr";
import * as DB from "./value-type-basics/dec-basics";
import * as FB from "./value-type-basics/frac-basics";
import * as DGB from "./value-type-basics/degree-basics";
import * as FNC from "./operation-fn-creators";
import type { OperationFn } from "../calc-core/types";
import { InternalNumber } from "../calc-core/internal-number";
import calculatorMemory from "../../observables/calculator-memory";

export function getDecValue(x: InternalNumber): Decimal{
    switch (x.type) {
        case "DEC":
            return x.dec;
        case "FRAC":
            return FB.toDecValue(x.frac);
        case "DEGREE":
            return DGB.toDecValue(x.degree);
    }
}

export const negative: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.neg());
        case "FRAC":
            return new InternalNumber("FRAC", { u: x.frac.u.neg(), d: x.frac.d });
        case "DEGREE":
            return new InternalNumber("DEGREE", { ...x.degree, neg: !x.degree.neg });
    }
}

export const cbrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.cbrt());
        case "FRAC":
            const resFrac = FB.fromTerminatingDiv(x.frac.u.cbrt(), x.frac.d.cbrt());
            return new InternalNumber("FRAC", resFrac);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).cbrt());
    }
}

export const sqrt: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.sqrt());
        case "FRAC":
            const resFrac = FB.fromTerminatingDiv(x.frac.u.sqrt(), x.frac.d.sqrt());
            return new InternalNumber("FRAC", resFrac);
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).sqrt());
    }
}

export const log: OperationFn = FNC.createDecUnaryOpFn(Decimal.log10);
export const ln: OperationFn = FNC.createDecUnaryOpFn(Decimal.log);
export const exp10: OperationFn = FNC.createDecUnaryOpFn((x: Decimal) => Decimal.pow(10,x));
export const exp: OperationFn = FNC.createDecUnaryOpFn(Decimal.exp);

export const sin: OperationFn = FNC.createTriangleOpFn(Decimal.sin);
export const cos: OperationFn = FNC.createTriangleOpFn(Decimal.cos);
export const tan: OperationFn = FNC.createTriangleOpFn(Decimal.tan);

export const sinh: OperationFn = FNC.createDecUnaryOpFn(Decimal.sinh);
export const cosh: OperationFn = FNC.createDecUnaryOpFn(Decimal.cosh);
export const tanh: OperationFn = FNC.createDecUnaryOpFn(Decimal.tanh);

export const asin: OperationFn = FNC.createArcTriangleOpFn(Decimal.asin);
export const acos: OperationFn = FNC.createArcTriangleOpFn(Decimal.acos);
export const atan: OperationFn = FNC.createArcTriangleOpFn(Decimal.atan);

export const fact: OperationFn = FNC.createDecUnaryOpFn(FACT.fact);
export const inv: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("FRAC", DB.divDec(new Decimal(1),x.dec));
        case "FRAC":
            return new InternalNumber("FRAC", FB.invert(x.frac));
        case "DEGREE":
            return new InternalNumber("FRAC", DB.divDegree(new Decimal(1),x.degree));
    }
}
export const cube: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(3));
        case "FRAC":
            return new InternalNumber("FRAC", FB.intPower(x.frac,new Decimal(3)));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).pow(3));
    }
}
export const sqr: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(2));
        case "FRAC":
            return new InternalNumber("FRAC", FB.intPower(x.frac, new Decimal(2)));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).pow(2));
    }
}
export const percent: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.mul(100));
        case "FRAC":
            return new InternalNumber("FRAC", FB.mulDec(x.frac,new Decimal(100)));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).mul(100));
    }
}

export const nCr: OperationFn = FNC.createDecBinaryOpFn(NCRNPR.nCr);
export const nPr: OperationFn = FNC.createDecBinaryOpFn(NCRNPR.nPr);

export const pow: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const yDec = getDecValue(y);
    
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", x.dec.pow(yDec));
        case "FRAC":
            if (yDec.isInteger()) {
                return new InternalNumber("FRAC", FB.intPower(x.frac, yDec));
            }
            return new InternalNumber("DEC", FB.toDecValue(x.frac).pow(yDec));
        case "DEGREE":
            return new InternalNumber("DEC", DGB.toDecValue(x.degree).pow(yDec));
    }
}

export const root: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const xDec = getDecValue(x);
    const yDec = getDecValue(y);

    if (yDec.gte(0)) {
        if (xDec.eq(2)) {
            return sqrt(y);
        }

        if (xDec.eq(3)) {
            return cbrt(y);
        }

        return pow(y, inv(x));
    }
    else {
        const yNeg = negative(y);

        return negative(root(x,yNeg));
    }
}

export const add: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.add(y.dec));
                case "DEGREE":
                    return new InternalNumber("DEC", DB.addDegree(x.dec, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.addDec(y.frac, x.dec));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", DB.addDegree(y.dec, x.degree));
                case "DEGREE":
                    return new InternalNumber("DEGREE", DGB.addDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.addDegree(y.frac, x.degree));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.addDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", FB.addDegree(x.frac, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.addFrac(x.frac, y.frac));
            }
    }
}

export const sub: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.sub(y.dec));
                case "DEGREE":
                    return new InternalNumber("DEC", DB.subDegree(x.dec, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", DB.subFrac(x.dec, y.frac));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", DGB.subDec(x.degree,y.dec));
                case "DEGREE":
                    return new InternalNumber("DEGREE", DGB.subDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", DGB.subFrac(x.degree, y.frac));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.subDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", FB.subDegree(x.frac, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.subFrac(x.frac, y.frac));
            }
    }
}

export const mul: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec.mul(y.dec));
                case "DEGREE":
                    return new InternalNumber("DEGREE", DB.mulDegree(x.dec, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.mulDec(y.frac, x.dec));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEGREE", DB.mulDegree(y.dec, x.degree));
                case "DEGREE":
                    return new InternalNumber("DEC", DGB.mulDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.mulDegree(y.frac, x.degree));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.mulDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", FB.mulDegree(x.frac, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.mulFrac(x.frac, y.frac));
            }
    }
}

export const div: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", DB.divDec(x.dec, y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", DB.divDegree(x.dec, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", DB.divFrac(x.dec, y.frac));
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", DGB.divDec(x.degree,y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", DGB.divDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", DGB.divFrac(x.degree,y.frac));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("FRAC", FB.divDec(x.frac, y.dec));
                case "DEGREE":
                    return new InternalNumber("FRAC", FB.divDegree(x.frac, y.degree));
                case "FRAC":
                    return new InternalNumber("FRAC", FB.divFrac(x.frac, y.frac));
            }
    }
}

export const pol: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const xDec = getDecValue(x);
    const yDec = getDecValue(y);

    if (xDec.isZero()) {
        if (yDec.isZero()) {
            calculatorMemory.E = new InternalNumber("DEC", new Decimal(0));
            calculatorMemory.F = new InternalNumber("DEC", new Decimal(0));
            return new InternalNumber("DEC", new Decimal(0));
        }
        else if (yDec.isPos()) {
            calculatorMemory.E = y;
            calculatorMemory.F = acos(new InternalNumber("DEC", new Decimal(0)));
            return y;
        }
        else {
            const negY = negative(y);
            calculatorMemory.E = negY;
            calculatorMemory.F = negative(acos(new InternalNumber("DEC", new Decimal(0))));
            return negY;
        }
    }

    if (xDec.isNeg() && yDec.isZero()) {
        const negX = negative(x);
        calculatorMemory.E = negX;
        calculatorMemory.F = acos(new InternalNumber("DEC", new Decimal(-1)));
        return negX;
    }

    const dis = sqrt(add(sqr(x), sqr(y)));
    const angle = atan(div(y, x));

    calculatorMemory.E = dis;
    calculatorMemory.F = angle;
    return dis;
}

export const rec: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    // coord x
    calculatorMemory.E = mul(x, cos(y));
    // coord y
    calculatorMemory.F = mul(x, sin(y));
    return calculatorMemory.E;
}