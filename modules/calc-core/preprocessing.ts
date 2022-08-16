import {
    KeyEntry,
    KEY_ENTRIES,
    isLBracketType,
    isRBracketType,

    isUnaryR,
    isVar,
    isNum
} from "./key-entry";

function padRBrackets(entries_: KeyEntry[]): KeyEntry[]{
    const entries: KeyEntry[] = Object.assign([], entries_);

    let bracketDiffCount = 0;

    for (const i of entries) {
        if (isLBracketType(i) || i.id === "POL" || i.id === "REC") {
            bracketDiffCount++;
        }
        else if (i.id === ")") {
            bracketDiffCount--;
        }
    }

    if (bracketDiffCount > 0) {
        for (let i = 0; i < bracketDiffCount; i++){
            entries.push(KEY_ENTRIES.rBracket);
        }
    }

    return entries;
}

function reduceAddSub(entries_: KeyEntry[]): KeyEntry[]{
    const entries: KeyEntry[] = Object.assign([], entries_);

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

    return entries;
}

function fillMul(entries_: KeyEntry[]): KeyEntry[]{
    const entries: KeyEntry[] = Object.assign([], entries_);

    // places to fill MUL:
    // ()()
    // ()Var
    // Var()
    // VarVar
    // Num()
    // NumVar
    // UnaryR()
    // UnaryRVar

    for (let i = 0; i < entries.length - 1; i++){
        if (isRBracketType(entries[i])
            || isVar(entries[i])
            || isNum(entries[i])
            ||isUnaryR(entries[i])) {
            if (isLBracketType(entries[i + 1]) || isVar(entries[i + 1])) {
                entries.splice(i + 1, 0, KEY_ENTRIES.mul);
            }
        }
    }

    return entries;
}

export function preprocess(entries: KeyEntry[]): KeyEntry[]{
    return fillMul(reduceAddSub(padRBrackets(entries)));
}