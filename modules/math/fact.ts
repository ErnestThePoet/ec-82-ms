import { OperationFn } from "../calc-core/operators";

export const fact:OperationFn=(x: number)=>{
    let res = 1;
    for (let i = 1; i <= x; i++){
        res *= i;
    }
    return res;
}