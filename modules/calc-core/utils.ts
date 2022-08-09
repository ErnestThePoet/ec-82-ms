export function isInteger(x: number): boolean{
    return x % 1===0;
}

export function isNonNegativeInteger(x: number): boolean {
    return isInteger(x) && x >= 0;
}

export function isOdd(x: number): boolean{
    return isInteger(x) && x % 2 === 1;
}

