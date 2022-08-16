import { KeyEntry, isLBracketType, KEY_ENTRIES } from "./key-entry";

function padBrackets(entries_: KeyEntry[]): KeyEntry[]{
    const entries: KeyEntry[] = Object.assign([], entries_);

    let bracketDiffCount = 0;

    for (const i of entries) {
        if (isLBracketType(i.id) || i.id === "POL" || i.id === "REC") {
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