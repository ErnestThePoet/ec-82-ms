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
import type { FracValue, OperationFn } from "../calc-core/types";
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

export const negative: OperationFn = (x: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            return new InternalNumber("DEC", -x.dec);
        case "FRAC":
            return new InternalNumber("FRAC", { u: -x.frac.u, d: x.frac.d });
        case "DEGREE":
            return new InternalNumber("DEGREE", { ...x.degree, neg: !x.degree.neg });
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

export const asin: OperationFn = FNC.createArcTriangleOpFn(Math.asin);
export const acos: OperationFn = FNC.createArcTriangleOpFn(Math.acos);
export const atan: OperationFn = FNC.createArcTriangleOpFn(Math.atan);

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

export const root: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const xDec = getDecValue(x);
    const yDec = getDecValue(y);

    if (yDec >= 0) {
        if (xDec === 2) {
            return sqrt(y);
        }

        if (xDec === 3) {
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
                    return new InternalNumber("DEC", x.dec + y.dec);
                case "DEGREE":
                    return new InternalNumber("DEC", DB.addDegree(x.dec, y.degree));
                case "FRAC":
                    const res = FB.addDec(y.frac, x.dec);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", DB.addDegree(y.dec, x.degree));
                case "DEGREE":
                    return new InternalNumber("DEGREE", DGB.addDegree(x.degree, y.degree));
                case "FRAC":
                    const res = FB.addDegree(y.frac, x.degree);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    const res1 = FB.addDec(x.frac, y.dec);
                    if (res1.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res1.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res1.value);
                    }
                case "DEGREE":
                    const res2 = FB.addDegree(x.frac, y.degree);
                    if (res2.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res2.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res2.value);
                    }
                case "FRAC":
                    const product = FB.addFrac(x.frac, y.frac);
                    if (!FB.isSafe(product)) {
                        return new InternalNumber("DEC", FB.toDecValue(product));
                    }
                    return new InternalNumber("FRAC", product);
            }
    }
}

export const sub: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec - y.dec);
                case "DEGREE":
                    return new InternalNumber("DEC", DB.subDegree(x.dec, y.degree));
                case "FRAC":
                    const res = DB.subFrac(x.dec, y.frac);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", DGB.subDec(x.degree,y.dec));
                case "DEGREE":
                    return new InternalNumber("DEGREE", DGB.subDegree(x.degree, y.degree));
                case "FRAC":
                    const res = DGB.subFrac(x.degree,y.frac);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    const res1 = FB.subDec(x.frac, y.dec);
                    if (res1.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res1.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res1.value);
                    }
                case "DEGREE":
                    const res2 = FB.subDegree(x.frac, y.degree);
                    if (res2.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res2.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res2.value);
                    }
                case "FRAC":
                    const product = FB.subFrac(x.frac, y.frac);
                    if (!FB.isSafe(product)) {
                        return new InternalNumber("DEC", FB.toDecValue(product));
                    }
                    return new InternalNumber("FRAC", product);
            }
    }
}

export const mul: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEC", x.dec * y.dec);
                case "DEGREE":
                    return new InternalNumber("DEGREE", DB.mulDegree(x.dec, y.degree));
                case "FRAC":
                    const res = FB.mulDec(y.frac, x.dec);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEGREE", DB.mulDegree(y.dec, x.degree));
                case "DEGREE":
                    return new InternalNumber("DEC", DGB.mulDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("DEGREE", FB.mulDegree(y.frac, x.degree));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    const res1 = FB.mulDec(x.frac, y.dec);
                    if (res1.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res1.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res1.value);
                    }
                case "DEGREE":
                    return new InternalNumber("DEGREE", FB.mulDegree(x.frac, y.degree));
                case "FRAC":
                    const product = FB.mulFrac(x.frac, y.frac);
                    if (!FB.isSafe(product)) {
                        return new InternalNumber("DEC", FB.toDecValue(product));
                    }
                    return new InternalNumber("FRAC", product);
            }
    }
}

export const div: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    switch (x.type) {
        case "DEC":
            switch (y.type) {
                case "DEC":
                    // special div fraction optimization
                    const divRes = DB.divDec(x.dec, y.dec);
                    if (divRes.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>divRes.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>divRes.value);
                    }
                case "DEGREE":
                    return new InternalNumber("DEGREE", DB.divDegree(x.dec, y.degree));
                case "FRAC":
                    const res = DB.divFrac(x.dec, y.frac);
                    if (res.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res.value);
                    }
            }
        case "DEGREE":
            switch (y.type) {
                case "DEC":
                    return new InternalNumber("DEGREE", DGB.divDec(x.degree,y.dec));
                case "DEGREE":
                    return new InternalNumber("DEC", DGB.divDegree(x.degree, y.degree));
                case "FRAC":
                    return new InternalNumber("DEGREE", DGB.divFrac(x.degree,y.frac));
            }
        case "FRAC":
            switch (y.type) {
                case "DEC":
                    const res1 = FB.divDec(x.frac, y.dec);
                    if (res1.isFrac) {
                        return new InternalNumber("FRAC", <FracValue>res1.value);
                    }
                    else {
                        return new InternalNumber("DEC", <number>res1.value);
                    }
                case "DEGREE":
                    return new InternalNumber("DEGREE", FB.divDegree(x.frac, y.degree));
                case "FRAC":
                    const product = FB.divFrac(x.frac, y.frac);
                    if (!FB.isSafe(product)) {
                        return new InternalNumber("DEC", FB.toDecValue(product));
                    }
                    return new InternalNumber("FRAC", product);
            }
    }
}

export const pol: OperationFn = (x: InternalNumber, y: InternalNumber) => {
    const xDec = getDecValue(x);
    const yDec = getDecValue(y);

    if (xDec === 0) {
        if (yDec === 0) {
            calculatorMemory.E = new InternalNumber("DEC", 0);
            calculatorMemory.F = new InternalNumber("DEC", 0);
            return new InternalNumber("DEC", 0);
        }
        else if (yDec > 0) {
            calculatorMemory.E = y;
            calculatorMemory.F = acos(new InternalNumber("DEC", 0));
            return y;
        }
        else {
            const negY = negative(y);
            calculatorMemory.E = negY;
            calculatorMemory.F = negative(acos(new InternalNumber("DEC", 0)));
            return negY;
        }
    }

    if (xDec < 0 && yDec === 0) {
        const negX = negative(x);
        calculatorMemory.E = negX;
        calculatorMemory.F = acos(new InternalNumber("DEC", -1));
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