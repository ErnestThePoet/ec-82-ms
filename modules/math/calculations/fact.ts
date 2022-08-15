export function fact(x: number):number{
    let res = 1;
    for (let i = 1; i <= x; i++){
        res *= i;
    }
    return res;
}