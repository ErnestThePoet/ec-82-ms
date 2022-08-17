import type { Operator } from "./operators";
import { InternalNumber } from "./internal-number";

type LexemType = "OP" | "NBR";
type LexemObj = Operator | InternalNumber;

export interface Lexem{
    type: LexemType;
    obj: LexemObj;
}