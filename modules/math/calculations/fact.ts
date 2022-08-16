import Decimal from "decimal.js";

export function fact(x: Decimal): Decimal{
    let res = new Decimal(1);
    for (let i = new Decimal(1); i.lt(x); i=i.add(1)){
        res = res.mul(i);
    }
    return res;
}