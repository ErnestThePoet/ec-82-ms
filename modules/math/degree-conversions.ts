import Decimal from "decimal.js";
import calculatorState from "../../observables/calculator-state";
import * as C from "../math/constants";

export function degreeToRad(degree: Decimal): Decimal{
    return new Decimal(C.PI).mul(degree).div(180);
}

export function gradeToRad(grade: Decimal): Decimal{
    return new Decimal(C.PI).mul(grade).div(200);
}

export function radToDegree(rad: Decimal): Decimal{
    return new Decimal(180).mul(rad).div(C.PI);
}

export function radToGrade(rad: Decimal): Decimal{
    return new Decimal(200).mul(rad).div(C.PI);
}

export function fromCurrentDegreeToRad(x: Decimal) {
    switch (calculatorState.drgMode) {
        case "D":
            x = degreeToRad(x);
            break;
        case "G":
            x = gradeToRad(x);
            break;
    }
    return x;
}

export function toCurrentDegreeFromRad(x: Decimal) {
    switch (calculatorState.drgMode) {
        case "D":
            x = radToDegree(x);
            break;
        case "G":
            x = radToGrade(x);
            break;
    }
    return x;
}