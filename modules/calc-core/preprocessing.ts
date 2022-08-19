import {
    KeyEntry,
    KEY_ENTRIES,

    isOpUnaryL,
    isOpUnaryR,

    isLBracketEqv,
    isRBracket,

    isSymbol,
    isVar,
    isNum,
    isOpBinary
} from "./objs/key-entry";

function appendAns(entries: KeyEntry[]):void{
    if (entries.length===1&&isOpUnaryL(entries[0])) {
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
    // X -> UnaryL | BinaryFn | BracketL | BinaryOp | Comma | <Start>
    // Y -> UnaryL | BinaryFn | BracketL | Var | Num
    // reduce rules:
    // X+Y => XY
    // X-Y => XnegY)
    // note that neg is a special UnaryL because no LBracket is shown.
    // that's why we manually add the RBracket.

    const isX = (x: KeyEntry) =>
        isLBracketEqv(x) || isOpBinary(x) || x.id==="COMMA";
    const isY = (x: KeyEntry) =>
        isLBracketEqv(x) || isVar(x) || isNum(x);
    
    for (let i = -1; i <=entries.length-3; i++){
        if ((i===-1||(i>=0&&isX(entries[i])))
            && entries[i + 1].id === "ADD"
            && isY(entries[i+2])) {
            entries.splice(i + 1, 1);
            // next search should start from X
            i--;
        }
        else if ((i===-1||(i>=0&&isX(entries[i])))
            && entries[i + 1].id === "SUB"
            && isY(entries[i+2])) {
            entries[i + 1] = KEY_ENTRIES.neg;
            // for LBracketEqv, append a rBracket after its matching rBracket.
            // if it has no matching rBracket, do nothing and leave the two 
            // padding jobs for next preprocessing step.
            if (isLBracketEqv(entries[i+2])) {
                let bracketDiff = 0;
                let probeIndex = i + 3;
                while (probeIndex < entries.length) {
                    if (isLBracketEqv(entries[probeIndex])) {
                        bracketDiff++;
                    }
                    else if (isRBracket(entries[probeIndex])) {
                        if (bracketDiff === 0) {
                            break;
                        }
                        else {
                            bracketDiff--;
                        }
                    }
                    probeIndex++;
                }

                if (probeIndex >= entries.length) {
                    continue;
                }
                else {
                    entries.splice(probeIndex + 1, 0, KEY_ENTRIES.rBracket);
                }
            }
            else if (isNum(entries[i + 2])) {
                let probeIndex = i + 3;
                while (probeIndex < entries.length
                    && isNum(entries[probeIndex])) {
                    probeIndex++;
                }

                entries.splice(probeIndex, 0, KEY_ENTRIES.rBracket);
            }
            else {
                entries.splice(i + 3, 0, KEY_ENTRIES.rBracket);
            }
            
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