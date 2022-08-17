import {
    KeyEntry,
    isLBracketEqv,
    isLBracketEqvNoFn,
    isRBracket,

    isUnaryL,
    isUnaryR,
    isBinary,
    isBinaryFn,
    isNum,
    isVar
} from "./objs/key-entry";
import { Lexem } from "./objs/lexem";
import { getOperatorById } from "./objs/operators";

interface ParseResult {
    success: boolean;
    msg: string;
    failIndex: number;
    lexems: Lexem[];
}

// used to store pre-parsed units.
// these units include UnaryR expressions, 
// BinaryFn expressions and TernaryFn expressions.
interface PreparsedUnit{
    startIndex: number;
    endIndex: number;
    lexems: Lexem[];
}

export function parse(entries: KeyEntry[]): ParseResult{
    const s1: Lexem[] = [];
    const s2: Lexem[] = [];

    const preparsedUnits: PreparsedUnit[] = [];

    // pre-parse UnaryR expressions
    // its left can only be ()[including UnaryL], Nbr+, Nbr*Var+
    // before reaching a BinaryOp or the start position.
    for (let i = entries.length - 1; i > 0; i--){
        if (isUnaryR(entries[i])) {
            const subEntries: KeyEntry[] = [];
            let probeIndex = i - 1;
            if (isRBracket(entries[i - 1])) {
                // add key entries to subEntries until we reach a LBracketType
                // if we fail to reach a LBracketType, then the parsing is unsuccessful
                
                while (probeIndex >= 0
                    && !isBinary(entries[probeIndex])
                    && !isLBracketEqv(entries[probeIndex])) {
                    subEntries.unshift(entries[probeIndex]);
                    probeIndex--;
                }

                if (probeIndex < 0 || isBinary(entries[probeIndex])) {
                    const failIndex = probeIndex < 0 ? 0 : probeIndex;
                    return {
                        success: false,
                        msg: `Unexpected key entry at ${failIndex}`,
                        failIndex,
                        lexems: []
                    };
                }
            }
            else if (isVar(entries[i-1])) {
                
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

            preparsedUnits.push({
                startIndex: probeIndex,
                endIndex: i,
                lexems: subParseResult.lexems
            });

            // next iteration will start from probeIndex-1
            i = probeIndex;
        }
    }


}