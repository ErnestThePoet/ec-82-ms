// These arrays are used to determine if a KeyEntry belongs to a certain type.
const OPERATOR_UNARY_L_IDS: readonly string[]
    = ["CBRT", "SQRT", "LOG", "LN", "EXP10", "EXP",
        "SIN", "COS", "TAN", "SINH", "COSH", "TANH", "ASIN", "ACOS", "ATAN"] as const;

const OPERATOR_UNARY_R_IDS: readonly string[]
    = ["FACT", "INV", "CUBE", "SQR", "PERCENT", "FROM_D", "FROM_R", "FROM_G"] as const;

const OPERATOR_BINARY_IDS: readonly string[]
    = ["NPR", "NCR", "POW", "ROOT", "ADD", "SUB", "MUL", "DIV"] as const;

const OPERATOR_BINARY_FN_IDS: readonly string[]
    = ["POL", "REC"] as const;

const VAR_IDS: readonly string[]
    = ["A", "B", "C", "D", "E", "F", "X", "Y", "M", "e", "PI", "RAN", "ANS"];

const NUM_IDS: readonly string[]
    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

    

type OperatorUnaryLId = "CBRT" | "SQRT" | "LOG" | "LN" | "EXP10" | "EXP"
    | "SIN" | "COS" | "TAN" | "SINH" | "COSH" | "TANH" | "ASIN" | "ACOS" | "ATAN";
type OperatorUnaryRId = "FACT" | "INV" | "CUBE" | "SQR" | "PERCENT" | "FROM_D" | "FROM_R" | "FROM_G";
type OperatorBinaryId = "NPR" | "NCR" | "POW" | "ROOT" | "ADD" | "SUB" | "MUL" | "DIV";
type OperatorBinaryFnId = "POL" | "REC";

type BracketId = "(" | ")";
type SymbolId = "NEG" | "FRAC" | "DEGREE" | "COMMA";
type VarId = "A" | "B" | "C" | "D" | "E" | "F" | "X" | "Y" | "M" | "e" | "PI" | "RAN" | "ANS";
type NumId = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";

type KeyEntryId = OperatorUnaryLId | OperatorUnaryRId
    | OperatorBinaryId | OperatorBinaryFnId
    | BracketId | SymbolId | VarId | NumId;

export interface KeyEntry {
    svg: string;
    id: KeyEntryId;
}

export function isRBracketType(k: KeyEntry): boolean {
    return k.id === ")";
}

export function isLBracketType(k: KeyEntry): boolean {
    return k.id === "("
        || OPERATOR_UNARY_L_IDS.includes(k.id)
        || OPERATOR_UNARY_R_IDS.includes(k.id)
        || OPERATOR_BINARY_FN_IDS.includes(k.id);
}

export function isLBracketTypeNoFn(k: KeyEntry): boolean {
    return k.id === "("
        || OPERATOR_UNARY_L_IDS.includes(k.id)
        || OPERATOR_UNARY_R_IDS.includes(k.id);
}

export function isUnaryL(k: KeyEntry): boolean {
    return OPERATOR_UNARY_L_IDS.includes(k.id);
}

export function isUnaryR(k: KeyEntry): boolean{
    return OPERATOR_UNARY_R_IDS.includes(k.id);
}

export function isBinary(k: KeyEntry): boolean {
    return OPERATOR_BINARY_IDS.includes(k.id);
}

export function isBinaryFn(k: KeyEntry): boolean {
    return OPERATOR_BINARY_FN_IDS.includes(k.id);
}

export function isVar(k: KeyEntry): boolean{
    return VAR_IDS.includes(k.id);
}

export function isNum(k: KeyEntry): boolean {
    return NUM_IDS.includes(k.id);
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
        svg: ""
    },
    sqrt: {
        id: "SQRT",
        svg: ""
    },
    log: {
        id: "LOG",
        svg: ""
    },
    ln: {
        id: "LN",
        svg: ""
    },
    exp10: {
        id: "EXP10",
        svg: ""
    },
    exp: {
        id: "EXP",
        svg: ""
    },
    sin: {
        id: "SIN",
        svg: ""
    },
    cos: {
        id: "COS",
        svg: ""
    },
    tan: {
        id: "TAN",
        svg: ""
    },
    sinh: {
        id: "SINH",
        svg: ""
    },
    cosh: {
        id: "COSH",
        svg: ""
    },
    tanh: {
        id: "TANH",
        svg: ""
    },
    asin: {
        id: "ASIN",
        svg: ""
    },
    acos: {
        id: "ACOS",
        svg: ""
    },
    atan: {
        id: "ATAN",
        svg: ""
    },

    fact: {
        id: "FACT",
        svg: ""
    },
    inv: {
        id: "INV",
        svg: ""
    },
    cube: {
        id: "CUBE",
        svg: ""
    },
    sqr: {
        id: "SQR",
        svg: ""
    },
    percent: {
        id: "PERCENT",
        svg: ""
    },
    fromD: {
        id: "FROM_D",
        svg: ""
    },
    fromR: {
        id: "FROM_R",
        svg: ""
    },
    fromG: {
        id: "FROM_G",
        svg: ""
    },

    npr: {
        id: "NPR",
        svg: ""
    },
    ncr: {
        id: "NCR",
        svg: ""
    },
    pow: {
        id: "POW",
        svg: ""
    },
    root: {
        id: "ROOT",
        svg: ""
    },
    add: {
        id: "ADD",
        svg: ""
    },
    sub: {
        id: "SUB",
        svg: ""
    },
    mul: {
        id: "MUL",
        svg: ""
    },
    div: {
        id: "DIV",
        svg: ""
    },

    pol: {
        id: "POL",
        svg: ""
    },
    rec: {
        id: "REC",
        svg: ""
    },

    lBracket: {
        id: "(",
        svg: ""
    },
    rBracket: {
        id: ")",
        svg: ""
    },

    neg: {
        id: "NEG",
        svg: ""
    },
    frac: {
        id: "FRAC",
        svg: ""
    },
    degree: {
        id: "DEGREE",
        svg: ""
    },
    comma: {
        id: "COMMA",
        svg: ""
    },

    A: {
        id: "A",
        svg: ""
    },
    B: {
        id: "B",
        svg: ""
    },
    C: {
        id: "C",
        svg: ""
    },
    D: {
        id: "D",
        svg: ""
    },
    E: {
        id: "E",
        svg: ""
    },
    F: {
        id: "F",
        svg: ""
    },
    X: {
        id: "X",
        svg: ""
    },
    Y: {
        id: "Y",
        svg: ""
    },
    M: {
        id: "M",
        svg: ""
    },
    e: {
        id: "e",
        svg: ""
    },
    PI: {
        id: "PI",
        svg: ""
    },
    RAN: {
        id: "RAN",
        svg: ""
    },
    ANS: {
        id: "ANS",
        svg: ""
    },

    n0: {
        id: "0",
        svg: ""
    },
    n1: {
        id: "1",
        svg: ""
    },
    n2: {
        id: "2",
        svg: ""
    },
    n3: {
        id: "3",
        svg: ""
    },
    n4: {
        id: "4",
        svg: ""
    },
    n5: {
        id: "5",
        svg: ""
    },
    n6: {
        id: "6",
        svg: ""
    },
    n7: {
        id: "7",
        svg: ""
    },
    n8: {
        id: "8",
        svg: ""
    },
    n9: {
        id: "9",
        svg: ""
    },
    nDot: {
        id: ".",
        svg: ""
    }
};