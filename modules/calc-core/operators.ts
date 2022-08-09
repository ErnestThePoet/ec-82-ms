import { CheckFn, CHECK_FNS } from "./check-fns";

interface OperationFn{
    (...operands: number[]): number;
}

interface Operator{
    id: string;
    argN: number;
    ck: CheckFn;
    op: OperationFn;
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
    
]