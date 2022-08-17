import {
    KeyEntry,
    KEY_ENTRIES,

    isOpUnaryL,
    isOpUnaryR,

    isLBracketEqv,
    isRBracket,

    isSymbol,
    isVar,
    isNum
} from "./objs/key-entry";

function appendAns(entries: KeyEntry[]):void{
    if (isOpUnaryL(entries[entries.length - 1])) {
        entries.push(KEY_ENTRIES.ANS);
    }
}

function reduceAddSub(entries: KeyEntry[]): void{
    // ++ -> +
    // +- -> -
    // -+ -> -
    // -- -> +

    let i = 0;

    while (i < entries.length-1) {
        switch (entries[i].id) {
            case "ADD":
                switch (entries[i + 1].id) {
                    case "ADD":
                    case "SUB":
                        entries.splice(i, 1);
                        break;
                    default:
                        i++;
                        break;
                }
                break;
            case "SUB":
                switch (entries[i + 1].id) {
                    case "ADD":
                        entries.splice(i + 1, 1);
                        break;
                    case "SUB":
                        entries.splice(i, 1);
                        entries[i] = KEY_ENTRIES.add;
                        break;
                    default:
                        i++;
                        break;
                }
                break;
            default:
                i++;
                break;
        }
    }
}

function reducePosNeg(entries: KeyEntry[]): void{
    // previous preprocessing eusures there is no continuous +,-.
    // X -> UnaryL | BinaryFn | BracketL | Symbol
    // Y -> UnaryL | BinaryFn | BracketL | Var | Num
    // reduce rules:
    // X+Y => XY
    // X-Y => XnegY
    const isX = (x: KeyEntry) =>
        isLBracketEqv(x) || isSymbol(x);
    const isY = (x: KeyEntry) =>
        isLBracketEqv(x) || isVar(x) || isNum(x);
    
    for (let i = entries.length - 1; i >= 2; i--){
        if (isY(entries[i])
            && entries[i - 1].id === "ADD"
            && isX(entries[i - 2])) {
            entries.splice(i - 1, 1);
            // next search should start from X
            i--;
        }
        else if (isY(entries[i])
            && entries[i - 1].id === "SUB"
            && isX(entries[i - 2])) {
            entries[i - 1] = KEY_ENTRIES.neg;
            i--;
        }
    }
}

function padRBrackets(entries: KeyEntry[]): void{
    let bracketDiffCount = 0;

    for (const i of entries) {
        if (isLBracketEqv(i) || i.id === "POL" || i.id === "REC") {
            bracketDiffCount++;
        }
        else if (i.id === ")") {
            bracketDiffCount--;
        }
    }

    if (bracketDiffCount > 0) {
        for (let i = 0; i < bracketDiffCount; i++) {
            entries.push(KEY_ENTRIES.rBracket);
        }
    }
}

function fillMul(entries: KeyEntry[]): void{
    // places to fill MUL:
    // ()()
    // ()Var
    // Var()
    // VarVar
    // Num()
    // NumVar
    // UnaryR()
    // UnaryRVar
    // Degree()
    // DegreeVar

    for (let i = 0; i < entries.length - 1; i++){
        if (isRBracket(entries[i])
            || isVar(entries[i])
            || isNum(entries[i])
            || isOpUnaryR(entries[i])
            || entries[i].id==="DEGREE") {
            if (isLBracketEqv(entries[i + 1]) || isVar(entries[i + 1])) {
                entries.splice(i + 1, 0, KEY_ENTRIES.mul);
            }
        }
    }
}

export function preprocess(entries: KeyEntry[]): void{
    appendAns(entries);
    reduceAddSub(entries);
    reducePosNeg(entries);
    padRBrackets(entries);
    fillMul(entries);
}