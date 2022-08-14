// common types

// RI:
// u and d are integers.
// d is always positive.
export interface FracValue{
    u: number;
    d: number;
}

// RI:
// d and m are non-negative integers.
// s is non-negative.
export interface DegreeValue{
    d: number;
    m: number;
    s: number;
    neg: boolean;
}

export interface OperationFn {
    (...operands: number[]): number;
}

export interface CheckFn {
    (...operands: number[]): { ok: boolean, msg: string };
}