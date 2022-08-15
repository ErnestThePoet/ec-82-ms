import * as DB from "./value-type-basics/dec-basics";
import * as FB from "./value-type-basics/frac-basics";
import * as DGB from "./value-type-basics/degree-basics";
import type { OperationFn } from "../calc-core/types";
import { InternalNumber } from "../calc-core/internal-number";
import calculatorState from "../../observables/calculator-state";
import { degreeToRad, gradeToRad,radToDegree,radToGrade } from "../calc-core/utils";
import { getDecValue } from "./internal-number-math";

export function createDecUnaryOpFn(numberFn: (_:number) => number): OperationFn {
    return (x: InternalNumber) => {
        return new InternalNumber("DEC", numberFn(getDecValue(x)));
    }
}

export function createTriangleOpFn(numberFn: (_: number) => number): OperationFn{
    return (x: InternalNumber) => {
        let operand: number = getDecValue(x);

        switch (calculatorState.drgMode) {
            case "D":
                operand = degreeToRad(operand);
                break;
            case "G":
                operand = gradeToRad(operand);
                break;
        }

        return new InternalNumber("DEC", numberFn(operand));
    }
}

export function createArcTriangleOpFn(numberFn: (_: number) => number): OperationFn {
    return (x: InternalNumber) => {
        let res = numberFn(getDecValue(x));
        switch (calculatorState.drgMode) {
            case "D":
                res = radToDegree(res);
                break;
            case "G":
                res = radToGrade(res);
                break;
        }
        return new InternalNumber("DEC", res);
    }
}

export function createDecBinaryOpFn(numberFn: (_: number,__:number) => number): OperationFn {
    return (x: InternalNumber,y:InternalNumber) => {
        return new InternalNumber("DEC", numberFn(getDecValue(x),getDecValue(y)));
    }
}