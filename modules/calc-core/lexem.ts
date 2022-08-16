import Decimal from "decimal.js";
import type { Operator } from "./operators";
import { InternalNumber } from "./internal-number";

type LexemType = "OP" | "NBR";
type LexemObj = Operator | InternalNumber;

export class Lexem{
    constructor(type: LexemType, obj: LexemObj) {
        this.lexemType = type;
        this.lexemObj = obj;
    }

    private lexemType: LexemType = "NBR";
    private lexemObj: LexemObj = new InternalNumber("DEC", new Decimal(0));

    get type(): LexemType{
        return this.lexemType;
    }

    get obj(): LexemObj{
        return this.lexemObj;
    }
}