import type { Lexem } from "./lexem";

type OperatorUnaryLId = "CBRT" | "SQRT" | "LOG" | "LN" | "EXP10" | "EXP"
    | "SIN" | "COS" | "TAN" | "SINH" | "COSH" | "TANH" | "ASIN" | "ACOS" | "ATAN" | "NEG";
type OperatorUnaryRId = "FACT" | "INV" | "CUBE" | "SQR" | "PERCENT" | "FROM_D" | "FROM_R" | "FROM_G";
type OperatorBinaryId = "NPR" | "NCR" | "POW" | "ROOT" | "ADD" | "SUB" | "MUL" | "DIV";
type OperatorBinaryFnId = "POL" | "REC";

type BracketId = "(" | ")";
type SymbolId = "FRAC" | "DEGREE" | "COMMA";
type VarId = "A" | "B" | "C" | "D" | "E" | "F" | "X" | "Y" | "M" | "e" | "PI" | "RAN" | "ANS";
type NumId = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";

type KeyEntryId = OperatorUnaryLId | OperatorUnaryRId
    | OperatorBinaryId | OperatorBinaryFnId
    | BracketId | SymbolId | VarId | NumId |"PPU";

type KeyEntryType = "OP_UNARY_L" | "OP_UNARY_R" | "OP_BINARY" | "OP_BINARY_FN"
    | "BRACKET_L" | "BRACKET_R" | "SYMBOL" | "VAR" | "NUM"
    |"PPU";

export interface KeyEntry {
    svg: string;
    id: KeyEntryId;
    type: KeyEntryType;
    ppLexems?: Lexem[];
}

export function isOpUnaryL(k: KeyEntry): boolean {
    return k.type === "OP_UNARY_L";
}

export function isOpUnaryR(k: KeyEntry): boolean{
    return k.type === "OP_UNARY_R";
}

export function isOpBinary(k: KeyEntry): boolean {
    return k.type === "OP_BINARY";
}

export function isOpBinaryFn(k: KeyEntry): boolean {
    return k.type === "OP_BINARY_FN";
}

export function isLBracket(k: KeyEntry): boolean {
    return k.type === "BRACKET_L";
}

export function isLBracketEqv(k: KeyEntry): boolean {
    return k.type === "BRACKET_L"
        || k.type === "OP_UNARY_L"
        || k.type === "OP_BINARY_FN";
}

export function isLBracketEqvNoFn(k: KeyEntry): boolean {
    return k.type === "BRACKET_L"
        || k.type === "OP_UNARY_L";
}

export function isRBracket(k: KeyEntry): boolean {
    return k.type === "BRACKET_R";
}

export function isSymbol(k: KeyEntry): boolean{
    return k.type === "SYMBOL";
}

export function isVar(k: KeyEntry): boolean{
    return k.type === "VAR";
}

export function isNum(k: KeyEntry): boolean {
    return k.type === "NUM";
}

export function isPpu(k: KeyEntry): boolean{
    return k.type === "PPU";
}

interface KeyEntries {
    cbrt: KeyEntry;
    sqrt: KeyEntry;
    log: KeyEntry;
    ln: KeyEntry;
    exp10: KeyEntry;
    exp: KeyEntry;
    sin: KeyEntry;
    cos: KeyEntry;
    tan: KeyEntry;
    sinh: KeyEntry;
    cosh: KeyEntry;
    tanh: KeyEntry;
    asin: KeyEntry;
    acos: KeyEntry;
    atan: KeyEntry;

    fact: KeyEntry;
    inv: KeyEntry;
    cube: KeyEntry;
    sqr: KeyEntry;
    percent: KeyEntry;
    fromD: KeyEntry;
    fromR: KeyEntry;
    fromG: KeyEntry;

    npr: KeyEntry;
    ncr: KeyEntry;
    pow: KeyEntry;
    root: KeyEntry;
    add: KeyEntry;
    sub: KeyEntry;
    mul: KeyEntry;
    div: KeyEntry;

    pol: KeyEntry;
    rec: KeyEntry;

    lBracket: KeyEntry;
    rBracket: KeyEntry;

    neg: KeyEntry;
    frac: KeyEntry;
    degree: KeyEntry;
    comma: KeyEntry;

    A: KeyEntry;
    B: KeyEntry;
    C: KeyEntry;
    D: KeyEntry;
    E: KeyEntry;
    F: KeyEntry;
    X: KeyEntry;
    Y: KeyEntry;
    M: KeyEntry;
    e: KeyEntry;
    PI: KeyEntry;
    RAN: KeyEntry;
    ANS: KeyEntry;

    n0: KeyEntry;
    n1: KeyEntry;
    n2: KeyEntry;
    n3: KeyEntry;
    n4: KeyEntry;
    n5: KeyEntry;
    n6: KeyEntry;
    n7: KeyEntry;
    n8: KeyEntry;
    n9: KeyEntry;
    nDot: KeyEntry;
}

export const KEY_ENTRIES: KeyEntries = {
    cbrt: {
        id: "CBRT",
        type:"OP_UNARY_L",
        svg: ""
    },
    sqrt: {
        id: "SQRT",
        type: "OP_UNARY_L",
        svg: ""
    },
    log: {
        id: "LOG",
        type: "OP_UNARY_L",
        svg: ""
    },
    ln: {
        id: "LN",
        type: "OP_UNARY_L",
        svg: ""
    },
    exp10: {
        id: "EXP10",
        type: "OP_UNARY_L",
        svg: ""
    },
    exp: {
        id: "EXP",
        type: "OP_UNARY_L",
        svg: ""
    },
    sin: {
        id: "SIN",
        type: "OP_UNARY_L",
        svg: ""
    },
    cos: {
        id: "COS",
        type: "OP_UNARY_L",
        svg: ""
    },
    tan: {
        id: "TAN",
        type: "OP_UNARY_L",
        svg: ""
    },
    sinh: {
        id: "SINH",
        type: "OP_UNARY_L",
        svg: ""
    },
    cosh: {
        id: "COSH",
        type: "OP_UNARY_L",
        svg: ""
    },
    tanh: {
        id: "TANH",
        type: "OP_UNARY_L",
        svg: ""
    },
    asin: {
        id: "ASIN",
        type: "OP_UNARY_L",
        svg: ""
    },
    acos: {
        id: "ACOS",
        type: "OP_UNARY_L",
        svg: ""
    },
    atan: {
        id: "ATAN",
        type: "OP_UNARY_L",
        svg: ""
    },
    neg: {
        id: "NEG",
        type: "OP_UNARY_L",
        svg: ""
    },

    fact: {
        id: "FACT",
        type:"OP_UNARY_R",
        svg: ""
    },
    inv: {
        id: "INV",
        type: "OP_UNARY_R",
        svg: ""
    },
    cube: {
        id: "CUBE",
        type: "OP_UNARY_R",
        svg: ""
    },
    sqr: {
        id: "SQR",
        type: "OP_UNARY_R",
        svg: ""
    },
    percent: {
        id: "PERCENT",
        type: "OP_UNARY_R",
        svg: ""
    },
    fromD: {
        id: "FROM_D",
        type: "OP_UNARY_R",
        svg: ""
    },
    fromR: {
        id: "FROM_R",
        type: "OP_UNARY_R",
        svg: ""
    },
    fromG: {
        id: "FROM_G",
        type: "OP_UNARY_R",
        svg: ""
    },

    npr: {
        id: "NPR",
        type:"OP_BINARY",
        svg: ""
    },
    ncr: {
        id: "NCR",
        type: "OP_BINARY",
        svg: ""
    },
    pow: {
        id: "POW",
        type: "OP_BINARY",
        svg: ""
    },
    root: {
        id: "ROOT",
        type: "OP_BINARY",
        svg: ""
    },
    add: {
        id: "ADD",
        type: "OP_BINARY",
        svg: ""
    },
    sub: {
        id: "SUB",
        type: "OP_BINARY",
        svg: ""
    },
    mul: {
        id: "MUL",
        type: "OP_BINARY",
        svg: ""
    },
    div: {
        id: "DIV",
        type: "OP_BINARY",
        svg: ""
    },

    pol: {
        id: "POL",
        type:"OP_BINARY_FN",
        svg: ""
    },
    rec: {
        id: "REC",
        type: "OP_BINARY_FN",
        svg: ""
    },

    lBracket: {
        id: "(",
        type:"BRACKET_L",
        svg: ""
    },
    rBracket: {
        id: ")",
        type:"BRACKET_R",
        svg: ""
    },

    
    frac: {
        id: "FRAC",
        type:"SYMBOL",
        svg: ""
    },
    degree: {
        id: "DEGREE",
        type: "SYMBOL",
        svg: ""
    },
    comma: {
        id: "COMMA",
        type: "SYMBOL",
        svg: ""
    },

    A: {
        id: "A",
        type:"VAR",
        svg: ""
    },
    B: {
        id: "B",
        type: "VAR",
        svg: ""
    },
    C: {
        id: "C",
        type: "VAR",
        svg: ""
    },
    D: {
        id: "D",
        type: "VAR",
        svg: ""
    },
    E: {
        id: "E",
        type: "VAR",
        svg: ""
    },
    F: {
        id: "F",
        type: "VAR",
        svg: ""
    },
    X: {
        id: "X",
        type: "VAR",
        svg: ""
    },
    Y: {
        id: "Y",
        type: "VAR",
        svg: ""
    },
    M: {
        id: "M",
        type: "VAR",
        svg: ""
    },
    e: {
        id: "e",
        type: "VAR",
        svg: ""
    },
    PI: {
        id: "PI",
        type: "VAR",
        svg: ""
    },
    RAN: {
        id: "RAN",
        type: "VAR",
        svg: ""
    },
    ANS: {
        id: "ANS",
        type: "VAR",
        svg: ""
    },

    n0: {
        id: "0",
        type:"NUM",
        svg: ""
    },
    n1: {
        id: "1",
        type: "NUM",
        svg: ""
    },
    n2: {
        id: "2",
        type: "NUM",
        svg: ""
    },
    n3: {
        id: "3",
        type: "NUM",
        svg: ""
    },
    n4: {
        id: "4",
        type: "NUM",
        svg: ""
    },
    n5: {
        id: "5",
        type: "NUM",
        svg: ""
    },
    n6: {
        id: "6",
        type: "NUM",
        svg: ""
    },
    n7: {
        id: "7",
        type: "NUM",
        svg: ""
    },
    n8: {
        id: "8",
        type: "NUM",
        svg: ""
    },
    n9: {
        id: "9",
        type: "NUM",
        svg: ""
    },
    nDot: {
        id: ".",
        type: "NUM",
        svg: ""
    }
};