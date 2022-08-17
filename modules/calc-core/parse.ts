import {
    KeyEntry,
    isLBracketEqv,
    isLBracketEqvNoFn,
    isRBracket,

    isOpUnaryL,
    isOpUnaryR,
    isOpBinary,
    isOpBinaryFn,
    isNum,
    isVar,
    isPpu,
    KEY_ENTRIES
} from "./objs/key-entry";
import { Lexem } from "./objs/lexem";
import { getOperatorById } from "./objs/operators";

interface ParseResult {
    success: boolean;
    msg: string;
    failIndex: number;
    lexems: Lexem[];
}

export function parse(entries: KeyEntry[],offset:number): ParseResult{
    const s1: Lexem[] = [];
    const s2: Lexem[] = [];

    // first we eliminish all UnaryR, BinaryFn and TernaryFn.
    // We pre-parse them into a Lexem[] which can be treated as a Var.
    // Then we replace the original KeyEntrys with one KeyEntry
    // with type of "PPU" and with ppLexems storing the pre-parsed Lexem[].

    // pre-parse UnaryR expressions
    // its left can only be:
    // LBracketEqv),
    // Nbr+,
    // Var
    // PPU
    // before reaching the start position.
    for (let i = entries.length - 1; i > 0; i--){
        if (isOpUnaryR(entries[i])) {
            const subEntries: KeyEntry[] = [];
            let probeIndex = i - 1;
            if (isRBracket(entries[i - 1])) {
                // add key entries to subEntries until we reach a LBracketType
                // if we fail to reach a LBracketEqv, then the parsing is unsuccessful
                
                while (probeIndex >= 0
                    && !isLBracketEqv(entries[probeIndex])) {
                    subEntries.unshift(entries[probeIndex]);
                    probeIndex--;
                }

                if (probeIndex < 0) {
                    return {
                        success: false,
                        msg: "Failed to find matching (",
                        failIndex:0+offset,
                        lexems: []
                    };
                }
                else {
                    // make sure it points to the KeyEntry before PPU
                    probeIndex--;
                }
            }
            else if (isNum(entries[i - 1])) {
                while (probeIndex >= 0 && isNum(entries[probeIndex])) {
                    subEntries.unshift(entries[probeIndex]);
                    probeIndex--;
                }
            }
            else if (isVar(entries[i - 1]) || isPpu(entries[i - 1])) {
                probeIndex = i - 2;
                subEntries.unshift(entries[i - 1]);
            }
            else {
                return {
                    success: false,
                    msg: "Unexpected key entry",
                    failIndex: i-1+offset,
                    lexems: []
                };
            }

            const subParseResult = parse(subEntries,probeIndex+1);

            if (!subParseResult.success) {
                return subParseResult;
            }

            // append this UnaryR operator to postfix expression
            subParseResult.lexems.push({
                type: "OP",
                obj: getOperatorById(entries[i].id)
            });

            entries.splice(probeIndex + 1, i - probeIndex, {
                id: "PPU",
                svg: "",
                type: "PPU",
                ppLexems:subParseResult.lexems
            });

            // next iteration will start from probeIndex
            i = probeIndex+1;
        }
    }

    // preparse BinaryFns
    for (let i = 0; i < entries.length; i++){
        if (isOpBinaryFn(entries[i])) {
            // find a comma to terminate first arg
            const arg1Entries: KeyEntry[] = [];
            const arg2Entries: KeyEntry[] = [];
            
            let probeIndex = i + 1;

            while (probeIndex < entries.length
                && entries[probeIndex].id !== "COMMA") {
                arg1Entries.push(entries[probeIndex]);
                probeIndex++;
            }

            if (probeIndex >= entries.length) {
                return {
                    success: false,
                    msg: "Failed to find ,",
                    failIndex: entries.length-1+offset,
                    lexems: []
                };
            }
            else {
                // skip comma
                probeIndex++;
            }

            // find a rBracket to terminate 2nd arg

            while (probeIndex < entries.length
                && entries[probeIndex].id !== ")") {
                arg2Entries.push(entries[probeIndex]);
                probeIndex++;
            }

            if (probeIndex >= entries.length) {
                return {
                    success: false,
                    msg: "Failed to find )",
                    failIndex: entries.length - 1+offset,
                    lexems: []
                };
            }

            const arg1ParseResult = parse(arg1Entries,i);

            if (!arg1ParseResult.success) {
                return arg1ParseResult;
            }

            const arg2ParseResult = parse(arg2Entries,i);

            if (!arg2ParseResult.success) {
                return arg2ParseResult;
            }

            const ppLexems = arg1ParseResult.lexems.concat(
                arg2ParseResult.lexems
            );

            // append this UnaryR operator to postfix expression
            ppLexems.push({
                type: "OP",
                obj: getOperatorById(entries[i].id)
            });

            entries.splice(i, probeIndex-i+1, {
                id: "PPU",
                svg: "",
                type: "PPU",
                ppLexems
            });

            // do not modify i
        }
    }

    // preparse TernaryFn: degree
    for (let i = entries.length - 1; i > 0; i--){
        // its left can only be:
        // LBracketEqv),
        // Nbr+,
        // Var
        // PPU
        // before reaching the start position.
        if (entries[i].id === "DEGREE") {
            const origI = i;
            let degreeCount = 1;
            const subEntriesSMD: Array<KeyEntry[]> = [[],[],[]];
            let probeIndex = i - 1;

            while (true) {
                if (isRBracket(entries[i - 1])) {
                    while (probeIndex >= 0
                        && !isLBracketEqv(entries[probeIndex])) {
                        subEntriesSMD[degreeCount-1].unshift(entries[probeIndex]);
                        probeIndex--;
                    }

                    if (probeIndex < 0) {
                        return {
                            success: false,
                            msg: "Failed to find matching (",
                            failIndex: 0+offset,
                            lexems: []
                        };
                    }
                    else {
                        probeIndex--;
                    }
                }
                else if (isNum(entries[i - 1])) {
                    while (probeIndex >= 0 && isNum(entries[probeIndex])) {
                        subEntriesSMD[degreeCount-1].unshift(entries[probeIndex]);
                        probeIndex--;
                    }
                }
                else if (isVar(entries[i - 1]) || isPpu(entries[i - 1])) {
                    probeIndex = i - 2;
                    subEntriesSMD[degreeCount - 1].unshift(entries[i - 1]);
                }
                else {
                    return {
                        success: false,
                        msg: "Unexpected key entry",
                        failIndex: i - 1+offset,
                        lexems: []
                    };
                }

                if (probeIndex < 0) {
                    break;
                }
                else if (entries[probeIndex].id === "DEGREE") {
                    degreeCount++;
                    if (degreeCount > 3) {
                        return {
                            success: false,
                            msg: "Too many degree symbols",
                            failIndex: i - 1+offset,
                            lexems: []
                        };
                    }
                    i = probeIndex;
                    if (i <= 0) {
                        break;
                    }
                    probeIndex--;
                }
                else {
                    break;
                }
            }

            for (const j of subEntriesSMD) {
                if (j.length === 0) {
                    j.push(KEY_ENTRIES.n0);
                }
            }

            const smdParseResults:ParseResult[] = [
                parse(subEntriesSMD[0],probeIndex+1),
                parse(subEntriesSMD[1], probeIndex + 1),
                parse(subEntriesSMD[2], probeIndex + 1)
            ];

            let smdLexems: Lexem[] = [];

            for (let j = 0; j < smdParseResults.length; j++){
                if (!smdParseResults[j].success) {
                    return smdParseResults[j];
                }

                smdLexems = smdLexems.concat(smdParseResults[j].lexems);
            }

            // append this UnaryR operator to postfix expression
            smdLexems.push({
                type: "OP",
                obj: getOperatorById("CREATE_DEGREE")
            });

            entries.splice(probeIndex + 1, origI - probeIndex, {
                id: "PPU",
                svg: "",
                type: "PPU",
                ppLexems: smdLexems
            });

            // next iteration will start from probeIndex
            i = probeIndex + 1;
        }
    }

    // normal parse

}