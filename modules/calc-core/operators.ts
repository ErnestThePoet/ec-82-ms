import { CheckFn, CHECK_FNS } from "./check-fns";
import { fact } from "../math/fact";

export interface OperationFn{
    (...operands: number[]): number;
}

interface Operator{
    id: string;
    argN: number;
    op: OperationFn;
    ck: CheckFn;
}

export const OPERATORS_UNARY_L: readonly Operator[] = [
    {
        id: "CBRT",
        argN:1,
        op: Math.cbrt,
        ck:CHECK_FNS.alwaysTrue
    },
    {
        id: "SQRT",
        argN: 1,
        op: Math.sqrt,
        ck: CHECK_FNS.sqrtCheck
    },
    {
        id: "LOG",
        argN: 1,
        op: Math.log10,
        ck: CHECK_FNS.logCheck
    },
    {
        id: "LN",
        argN: 1,
        op: Math.log,
        ck: CHECK_FNS.lnCheck
    },
    {
        id: "10EXP",
        argN: 1,
        op: (x: number) => 10 ** x,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "EXP",
        argN: 1,
        op: Math.exp,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "SIN",
        argN: 1,
        op: Math.sin,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "COS",
        argN: 1,
        op: Math.cos,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "TAN",
        argN: 1,
        op: Math.tan,
        ck: CHECK_FNS.tanCheck
    },
    {
        id: "SINH",
        argN: 1,
        op: Math.sinh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "COSH",
        argN: 1,
        op: Math.cosh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "TANH",
        argN: 1,
        op: Math.tanh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "ASIN",
        argN: 1,
        op: Math.asin,
        ck: CHECK_FNS.asinAcosCheck
    },
    {
        id: "ACOS",
        argN: 1,
        op: Math.acos,
        ck: CHECK_FNS.asinAcosCheck
    },
    {
        id: "ATAN",
        argN: 1,
        op: Math.atan,
        ck: CHECK_FNS.alwaysTrue
    },
] as const;

export const OPERATORS_UNARY_R: readonly Operator[] = [
    {
        id: "FACT",
        argN: 1,
        op: fact,
        ck:CHECK_FNS.factCheck
    },
    {
        id: "INV",
        argN: 1,
        op: (x:number)=>1/x,
        ck: CHECK_FNS.invCheck
    },
    {
        id: "CUBE",
        argN: 1,
        op: (x:number)=>x**3,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "SQR",
        argN: 1,
        op: (x:number)=>x**2,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "PERCENT",
        argN: 1,
        op: (x:number)=>x*0.01,
        ck: CHECK_FNS.alwaysTrue
    }
] as const;