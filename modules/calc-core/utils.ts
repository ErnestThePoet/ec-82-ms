export function isInteger(x: number): boolean{
    return x % 1===0;
}

export function isNonNegativeInteger(x: number): boolean {
    return isInteger(x) && x >= 0;
}

export function isOdd(x: number): boolean{
    return isInteger(x) && x % 2 === 1;
}

export function degreeToRad(degree: number): number{
    return Math.PI * degree / 180;
}

export function gradeToRad(grade: number): number{
    return Math.PI * grade / 200;
}

export function radToDegree(rad: number): number{
    return 180 * rad / Math.PI;
}

export function radToGrade(rad: number): number{
    return 200 * rad / Math.PI;
}