import { Lexem } from "./objs/lexem";
import { InternalNumber } from "./objs/internal-number";
import { Operator } from "./objs/operators";

interface CalculateResult{
    success: boolean;
    msg: string;
    result?: InternalNumber;
}

export function calculate(lexems: Lexem[]): CalculateResult{
    const operands: InternalNumber[] = [];

    for (let i = 0; i < lexems.length; i++){
        if (lexems[i].type === "NBR") {
            operands.push(lexems[i].obj as InternalNumber);
        }
        else {
            const op: Operator = lexems[i].obj as Operator;
            // check remaining arg count
            if (operands.length < op.argN) {
                return {
                    success: false,
                    msg: "Insufficent operands"
                };
            }
            
            // check validaty then calculate
            switch (op.argN) {
                case 1:
                    const opr11: InternalNumber = operands.pop()!;
                    const ckResult1 = op.ck(opr11);
                    if (!ckResult1.ok) {
                        return {
                            success: false,
                            msg: ckResult1.msg
                        };
                    }
                    operands.push(op.op(opr11));
                    break;
                case 2:
                    const opr22: InternalNumber = operands.pop()!;
                    const opr21: InternalNumber = operands.pop()!;
                    const ckResult2 = op.ck(opr21,opr22);
                    if (!ckResult2.ok) {
                        return {
                            success: false,
                            msg: ckResult2.msg
                        };
                    }
                    operands.push(op.op(opr21,opr22));
                    break;
                case 3:
                    const opr33: InternalNumber = operands.pop()!;
                    const opr32: InternalNumber = operands.pop()!;
                    const opr31: InternalNumber = operands.pop()!;
                    const ckResult3 = op.ck(opr31,opr32,opr33);
                    if (!ckResult3.ok) {
                        return {
                            success: false,
                            msg: ckResult3.msg
                        };
                    }
                    operands.push(op.op(opr31,opr32,opr33));
                    break;
            }
        }
    }

    if (operands.length !== 1) {
        return {
            success: false,
            msg: "Operand stack remaining count is not 1"
        };
    }

    return {
        success: true,
        msg: "",
        result: operands.pop()!
    };
}