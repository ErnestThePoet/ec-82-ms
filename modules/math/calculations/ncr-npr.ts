import { fact } from "./fact";

export function nPr(n: number, r: number):number {
    let res = 1;
    for (let i = n; i > n - r; i--){
        res *= i;
    }
    return res;
}

export function nCr(n: number, r: number):number {
    return nPr(n, r) / fact(r);
}