import { CHECK_FNS } from "./check-fns";
import type { CheckFn, OperationFn } from "./types";
import * as INM from "../../math/internal-number-math";

export interface Operator{
    id: string;
    argN: number;
    op: OperationFn;
    ck: CheckFn;
}

export const OPERATORS_UNARY_L: readonly Operator[] = [
    {
        id: "CBRT",
        argN:1,
        op: INM.cbrt,
        ck:CHECK_FNS.alwaysTrue
    },
    {
        id: "SQRT",
        argN: 1,
        op: INM.sqrt,
        ck: CHECK_FNS.sqrtCheck
    },
    {
        id: "LOG",
        argN: 1,
        op: INM.log10,
        ck: CHECK_FNS.logCheck
    },
    {
        id: "LN",
        argN: 1,
        op: INM.ln,
        ck: CHECK_FNS.lnCheck
    },
    {
        id: "EXP10",
        argN: 1,
        op: INM.exp10,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "EXP",
        argN: 1,
        op: INM.exp,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "SIN",
        argN: 1,
        op: INM.sin,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "COS",
        argN: 1,
        op: INM.cos,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "TAN",
        argN: 1,
        op: INM.tan,
        ck: CHECK_FNS.tanCheck
    },
    {
        id: "SINH",
        argN: 1,
        op: INM.sinh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "COSH",
        argN: 1,
        op: INM.cosh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "TANH",
        argN: 1,
        op: INM.tanh,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "ASIN",
        argN: 1,
        op: INM.asin,
        ck: CHECK_FNS.asinAcosCheck
    },
    {
        id: "ACOS",
        argN: 1,
        op: INM.acos,
        ck: CHECK_FNS.asinAcosCheck
    },
    {
        id: "ATAN",
        argN: 1,
        op: INM.atan,
        ck: CHECK_FNS.alwaysTrue
    }, {
        id: "NEG",
        argN: 1,
        op: INM.negative,
        ck: CHECK_FNS.alwaysTrue
    }
] as const;

export const OPERATORS_UNARY_R: readonly Operator[] = [
    {
        id: "FACT",
        argN: 1,
        op: INM.fact,
        ck:CHECK_FNS.factCheck
    },
    {
        id: "INV",
        argN: 1,
        op: INM.inv,
        ck: CHECK_FNS.invCheck
    },
    {
        id: "CUBE",
        argN: 1,
        op: INM.cube,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "SQR",
        argN: 1,
        op: INM.sqr,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "PERCENT",
        argN: 1,
        op: INM.percent,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "FROM_D",
        argN: 1,
        op: INM.fromD,
        ck:CHECK_FNS.alwaysTrue
    },
    {
        id: "FROM_R",
        argN: 1,
        op: INM.fromR,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "FROM_G",
        argN: 1,
        op: INM.fromG,
        ck: CHECK_FNS.alwaysTrue
    }
] as const;

export const OPERATORS_BINARY: readonly Operator[] = [
    {
        id: "NPR",
        argN: 2,
        op: INM.nPr,
        ck:CHECK_FNS.nCrnPrCheck
    },
    {
        id: "NCR",
        argN: 2,
        op: INM.nCr,
        ck:CHECK_FNS.nCrnPrCheck
    },
    {
        id: "POW",
        argN: 2,
        op: INM.pow,
        ck:CHECK_FNS.powCheck
    },
    {
        id: "ROOT",
        argN: 2,
        op: INM.root,
        ck:CHECK_FNS.rootCheck
    },
    {
        id: "ADD",
        argN: 2,
        op: INM.add,
        ck:CHECK_FNS.alwaysTrue
    },
    {
        id: "SUB",
        argN: 2,
        op: INM.sub,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "MUL",
        argN: 2,
        op: INM.mul,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "DIV",
        argN: 2,
        op: INM.div,
        ck: CHECK_FNS.divCheck
    },
    {
        id: "FRAC",
        argN: 2,
        op: INM.div,
        ck: CHECK_FNS.createFracCheck
    }
] as const;

export const OPERATORS_BINARY_FN: readonly Operator[] = [
    {
        id: "POL",
        argN: 2,
        op: INM.pol,
        ck: CHECK_FNS.alwaysTrue
    },
    {
        id: "REC",
        argN: 2,
        op: INM.rec,
        ck: CHECK_FNS.recCheck
    }
] as const;

export const OPERATORS_TERNARY_FN: readonly Operator[] = [
    {
        id: "CREATE_DEGREE",
        argN: 3,
        op: INM.createDegree,
        ck:CHECK_FNS.createDegreeCheck
    },
    // {
    //     id: "CREATE_FRAC",
    //     argN: 3,
    //     op: INM.createFrac,
    //     ck: CHECK_FNS.createFracCheck
    // }
] as const;

const FULL_OPERATORS: readonly Operator[] =
    OPERATORS_UNARY_L.concat(OPERATORS_UNARY_R).concat(OPERATORS_BINARY)
        .concat(OPERATORS_BINARY_FN).concat(OPERATORS_TERNARY_FN);

export function getOperatorById(id: string): Operator{
    return FULL_OPERATORS.find(x => x.id === id)!;
}