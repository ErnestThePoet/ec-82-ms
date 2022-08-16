const OPERATOR_UNARY_L_IDS: readonly string[]
    = ["CBRT", "SQRT", "LOG", "LN", "EXP10", "EXP",
        "SIN", "COS", "TAN", "SINH", "COSH", "TANH", "ASIN", "ACOS", "ATAN"] as const;

const OPERATOR_UNARY_R_IDS: readonly string[]
    = ["FACT", "INV", "CUBE", "SQR", "PERCENT"] as const;

const OPERATOR_BINARY_IDS: readonly string[]
    = ["NPR", "NCR", "POW", "ROOT", "ADD", "SUB", "MUL", "DIV"] as const;

const OPERATOR_BINARY_FN_IDS: readonly string[]
    = ["POL", "REC"] as const;

type OperatorUnaryLId = "CBRT" | "SQRT" | "LOG" | "LN" | "EXP10" | "EXP"
    | "SIN" | "COS" | "TAN" | "SINH" | "COSH" | "TANH" | "ASIN" | "ACOS" | "ATAN";
type OperatorUnaryRId = "FACT" | "INV" | "CUBE" | "SQR" | "PERCENT";
type OperatorBinaryId = "NPR" | "NCR" | "POW" | "ROOT" | "ADD" | "SUB" | "MUL" | "DIV";
type OperatorBinaryFnId = "POL" | "REC";

type BracketId = "(" | ")";
type SymbolId = "NEG" |"FRAC" |"DEGREE" | "COMMA";
type VarId = "A" | "B" | "C" | "D" | "E" | "F" | "X" | "Y" | "M" | "e" | "PI" | "RAN" | "ANS";
type NumId = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";

type KeyEntryId = OperatorUnaryLId | OperatorUnaryRId
    | OperatorBinaryId | OperatorBinaryFnId
    | BracketId | SymbolId | VarId | NumId;

export interface KeyEntry{
    svg: string;
    id: KeyEntryId;
}

function isRBracketType(k: KeyEntryId):boolean {
    return k === ")";
}

function isLBracketType(k: KeyEntryId): boolean{
    return k === "("
        || OPERATOR_UNARY_L_IDS.includes(k)
        || OPERATOR_UNARY_R_IDS.includes(k);
}