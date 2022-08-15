import * as DB from "./value-type-basics/dec-basics";
import * as FB from "./value-type-basics/frac-basics";
import * as DGB from "./value-type-basics/degree-basics";
import type { OperationFn } from "../calc-core/types";
import { InternalNumber } from "../calc-core/internal-number";
import calculatorState from "../../observables/calculator-state";
import { degreeToRad,gradeToRad } from "../calc-core/utils";

export function createDecBinaryOpFn(numberFn: (...operands: number[]) => number): OperationFn {
    return (x: InternalNumber) => {
        let operand: number = 0;
        switch (x.type) {
            case "DEC":
                operand = x.dec;
                break;
            case "FRAC":
                operand = FB.toDecValue(x.frac);
                break;
            case "DEGREE":
                operand = DGB.toDecValue(x.degree);
                break;
        }
        return new InternalNumber("DEC", numberFn(operand));
    }
}

export function createTriangleOpFn(numberFn: (...operands: number[]) => number): OperationFn{
    return (x: InternalNumber) => {
        let operand: number = 0;
        switch (x.type) {
            case "DEC":
                operand = x.dec;
                break;
            case "FRAC":
                operand = FB.toDecValue(x.frac);
                break;
            case "DEGREE":
                operand = DGB.toDecValue(x.degree);
                break;
        }

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