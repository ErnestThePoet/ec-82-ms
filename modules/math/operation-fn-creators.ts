import Decimal from "decimal.js";
import type { OperationFn } from "../calc-core/types";
import { InternalNumber } from "../calc-core/internal-number";
import calculatorState from "../../observables/calculator-state";
import { degreeToRad, gradeToRad,radToDegree,radToGrade } from "./degree-conversions";
import { getDecValue } from "./internal-number-math";

export function createDecUnaryOpFn(numberFn: (_:Decimal) => Decimal): OperationFn {
    return (x: InternalNumber) => {
        return new InternalNumber("DEC", numberFn(getDecValue(x)));
    }
}

export function createTriangleOpFn(numberFn: (_: Decimal) => Decimal): OperationFn{
    return (x: InternalNumber) => {
        let operand: Decimal = getDecValue(x);

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

export function createArcTriangleOpFn(numberFn: (_: Decimal) => Decimal): OperationFn {
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

export function createDecBinaryOpFn(numberFn: (_: Decimal,__:Decimal) => Decimal): OperationFn {
    return (x: InternalNumber,y:InternalNumber) => {
        return new InternalNumber("DEC", numberFn(getDecValue(x),getDecValue(y)));
    }
}