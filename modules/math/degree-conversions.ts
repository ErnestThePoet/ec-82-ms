import Decimal from "decimal.js";

export function degreeToRad(degree: Decimal): Decimal{
    return new Decimal(Math.PI).mul(degree).div(180);
}

export function gradeToRad(grade: Decimal): Decimal{
    return new Decimal(Math.PI).mul(grade).div(200);
}

export function radToDegree(rad: Decimal): Decimal{
    return new Decimal(180).mul(rad).div(Math.PI);
}

export function radToGrade(rad: Decimal): Decimal{
    return new Decimal(200).mul(rad).div(Math.PI);
}