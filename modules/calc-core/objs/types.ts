import Decimal from "decimal.js";
import { InternalNumber } from "./internal-number";
// common types

// RI:
// u and d are integers.
// d is always positive.
export interface FracValue {
    u: Decimal;
    d: Decimal;
}

// RI:
// d and m are [0,59] integers.
// s is [0,60).
export interface DegreeValue {
    d: Decimal;
    m: Decimal;
    s: Decimal;
    neg: boolean;
}

export interface OperationFn {
    (...operands: InternalNumber[]): InternalNumber;
}

export interface CheckFn {
    (...operands: InternalNumber[]): { ok: boolean; msg: string };
}
