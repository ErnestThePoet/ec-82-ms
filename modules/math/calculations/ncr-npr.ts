import Decimal from "decimal.js";
import { fact } from "./fact";

export function nPr(n: Decimal, r: Decimal): Decimal {
    let res = new Decimal(1);
    for (let i = n; i.gt(Decimal.sub(n,r)); i=i.sub(1)){
        res = res.mul(i);
    }
    return res;
}

export function nCr(n: Decimal, r: Decimal): Decimal {
    return nPr(n, r).div(fact(r));
}