// common types

// RI:
// u and d are integers.
// d is always positive.
export interface FracValue{
    u: number;
    d: number;
}

// RI:
// d and m are [0,59] integers.
// s is [0,60).
export interface DegreeValue{
    d: number;
    m: number;
    s: number;
    neg: boolean;
}

export interface TryToFracResult{
    ok: boolean;
    frac?: FracValue;
}

export interface FracDecOpResult {
    isFrac: boolean;
    value: FracValue | number;
}

export interface FracDegreeOpResult {
    isFrac: boolean;
    value: FracValue | number;
}

export interface OperationFn {
    (...operands: number[]): number;
}

export interface CheckFn {
    (...operands: number[]): { ok: boolean, msg: string };
}