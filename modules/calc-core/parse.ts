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
    KEY_ENTRIES,
    getNumString,
    getVarInternalNumber,
    isOpPriorityHigher,
    isLBracket
} from "./objs/key-entry";
import { Lexem } from "./objs/lexem";
import Decimal from "decimal.js";
import { InternalNumber } from "./objs/internal-number";
import { getOperatorById } from "./objs/operators";

interface ParseResult {
    success: boolean;
    msg: string;
    lexems: Lexem[];
}

export function parse(entries: KeyEntry[]): ParseResult{
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
                // add key entries to subEntries until we reach its LBracketType
                // if we fail to reach a LBracketEqv, then the parsing is unsuccessful

                // rBrackets-lBrackets during search.
                // set to -1 to make sure current rBracket returns it to 0
                let bracketDiff = -1;
                
                while (probeIndex >= 0) {
                    if (isRBracket(entries[probeIndex])) {
                        bracketDiff++;
                    }
                    else if (isLBracketEqv(entries[probeIndex])) {
                        if (bracketDiff === 0) {
                            // this is the matching lBracket
                            // include it to make sub parsing work
                            subEntries.unshift(entries[probeIndex]);
                            break;
                        }
                        else {
                            bracketDiff--;
                        }
                    }
                    subEntries.unshift(entries[probeIndex]);
                    probeIndex--;
                }

                if (probeIndex < 0) {
                    return {
                        success: false,
                        msg: "Missing (",
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
                    lexems: []
                };
            }

            const subParseResult = parse(subEntries);

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
                    lexems: []
                };
            }
            else {
                // skip comma
                probeIndex++;
            }

            // find a rBracket to terminate 2nd arg

            let bracketDiff = 0;

            while (probeIndex < entries.length) {
                if (isLBracketEqv(entries[probeIndex])) {
                    bracketDiff++;
                }
                else if (entries[probeIndex].id === ")") {
                    if (bracketDiff === 0) {
                        break;
                    }
                    else {
                        bracketDiff--;
                    }
                }
                arg2Entries.push(entries[probeIndex]);
                probeIndex++;
            }

            if (probeIndex >= entries.length) {
                return {
                    success: false,
                    msg: "Failed to find )",
                    lexems: []
                };
            }

            const arg1ParseResult = parse(arg1Entries);

            if (!arg1ParseResult.success) {
                return arg1ParseResult;
            }

            const arg2ParseResult = parse(arg2Entries);

            if (!arg2ParseResult.success) {
                return arg2ParseResult;
            }

            if (arg1ParseResult.lexems.length === 0
                || arg2ParseResult.lexems.length === 0) {
                return {
                    success: false,
                    msg: "Insufficent args",
                    lexems: []
                };
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
                    let bracketDiff = -1;

                    while (probeIndex >= 0) {
                        if (isRBracket(entries[probeIndex])) {
                            bracketDiff++;
                        }
                        else if (isLBracketEqv(entries[probeIndex])) {
                            if (bracketDiff === 0) {
                                // this is the matching lBracket
                                // include it to make sub parsing work
                                subEntriesSMD[degreeCount - 1]
                                    .unshift(entries[probeIndex]);
                                break;
                            }
                            else {
                                bracketDiff--;
                            }
                        }
                        subEntriesSMD[degreeCount-1].unshift(entries[probeIndex]);
                        probeIndex--;
                    }

                    if (probeIndex < 0) {
                        return {
                            success: false,
                            msg: "Missing (",
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

            let smdParseResults: ParseResult[] = [
                parse(subEntriesSMD[0]),
                parse(subEntriesSMD[1]),
                parse(subEntriesSMD[2])
            ];

            let dmsParseResults: ParseResult[] = [];

            switch (degreeCount) {
                case 1:
                    dmsParseResults = [
                        smdParseResults[0],
                        smdParseResults[1],
                        smdParseResults[2]
                    ];
                    break;
                case 2:
                    dmsParseResults = [
                        smdParseResults[1],
                        smdParseResults[0],
                        smdParseResults[2]
                    ];
                    break;
                case 3:
                    dmsParseResults = [
                        smdParseResults[2],
                        smdParseResults[1],
                        smdParseResults[0]
                    ];
                    break;
            }

            let dmsLexems: Lexem[] = [];

            for (let j = 0; j < dmsParseResults.length; j++){
                if (!dmsParseResults[j].success) {
                    return dmsParseResults[j];
                }

                dmsLexems = dmsLexems.concat(dmsParseResults[j].lexems);
            }

            // append this UnaryR operator to postfix expression
            dmsLexems.push({
                type: "OP",
                obj: getOperatorById("CREATE_DEGREE")
            });

            entries.splice(probeIndex + 1, origI - probeIndex, {
                id: "PPU",
                svg: "",
                type: "PPU",
                ppLexems: dmsLexems
            });

            // next iteration will start from probeIndex
            i = probeIndex + 1;
        }
    }

    // normal parse
    const s1: KeyEntry[] = [];
    let s2: Lexem[] = [];

    for (let i = 0; i < entries.length; i++){
        if (isPpu(entries[i])) {
            s2 = s2.concat(entries[i].ppLexems!);
        }
        else if (isVar(entries[i])) {
            s2.push({
                type: "NBR",
                obj: getVarInternalNumber(entries[i])
            });
        }
        else if (isNum(entries[i])) {
            let num: string = "";
            let dotCount = 0;
            let probeIndex = i;
            while (probeIndex < entries.length
                && isNum(entries[probeIndex])) {
                num += getNumString(entries[probeIndex]);
                dotCount += entries[probeIndex].id === "." ? 1 : 0;
                if (dotCount > 1) {
                    return {
                        success: false,
                        msg: "Too many decimal points",
                        lexems: []
                    };
                }
                probeIndex++;
            }

            // Decimal constructor does not accept single "."
            if (num === ".") {
                num = "0";
            }

            if (probeIndex < entries.length) {
                // make sure next iteration i points to the KeyEntry after last num
                probeIndex--;
            }

            s2.push({
                type: "NBR",
                obj: new InternalNumber("DEC", new Decimal(num))
            });

            i = probeIndex;
        }
        else if (isOpBinary(entries[i])) {
            if (s1.length === 0
                || isLBracketEqvNoFn(s1[s1.length - 1])
                || !isOpPriorityHigher(s1[s1.length - 1], entries[i])) {
                s1.push(entries[i]);
            }
            else {
                s2.push({
                    type: "OP",
                    obj: getOperatorById(s1.pop()!.id)
                });
                i--;
            }
        }
        else if (isLBracketEqvNoFn(entries[i])) {
            s1.push(entries[i]);
        }
        else if (isRBracket(entries[i])) {
            let isLBracketEqvFound: boolean = false;

            while (s1.length>0) {
                const currentOp = s1.pop()!;
                if (isOpUnaryL(currentOp)) {
                    s2.push({
                        type: "OP",
                        obj: getOperatorById(currentOp.id)
                    });
                    isLBracketEqvFound = true;
                    break;
                }
                else if (isLBracket(currentOp)) {
                    isLBracketEqvFound = true;
                    break;
                }
                else {
                    s2.push({
                        type: "OP",
                        obj: getOperatorById(currentOp.id)
                    });
                }
            }

            if (!isLBracketEqvFound) {
                return {
                    success: false,
                    msg: "Missing (",
                    lexems: []
                };
            }
        }
        else {
            return {
                success: false,
                msg: "Unexpected key entry",
                lexems: []
            };
        }
    }

    while (s1.length > 0) {
        s2.push({
            type: "OP",
            obj: getOperatorById(s1.pop()!.id)
        });
    }

    return {
        success: true,
        msg: "",
        lexems: s2
    };
}