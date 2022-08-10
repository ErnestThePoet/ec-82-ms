import { OperationFn } from "../calc-core/operators";
import { fact } from "./fact";

export const nPr: OperationFn = (n: number, r: number) => {
    let res = 1;
    for (let i = n; i > n - r; i--){
        res *= i;
    }
    return res;
}

export const nCr: OperationFn = (n: number, r: number) => {
    return nPr(n, r) / fact(r);
}