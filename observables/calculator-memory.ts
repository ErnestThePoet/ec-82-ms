import { InternalNumber } from "../modules/calc-core/internal-number";

class CalculatorMemory {
    ans: InternalNumber = new InternalNumber("DEC", 0);
    A: InternalNumber = new InternalNumber("DEC", 0);
    B: InternalNumber = new InternalNumber("DEC", 0);
    C: InternalNumber = new InternalNumber("DEC", 0);
    D: InternalNumber = new InternalNumber("DEC", 0);
    E: InternalNumber = new InternalNumber("DEC", 0);
    F: InternalNumber = new InternalNumber("DEC", 0);
    X: InternalNumber = new InternalNumber("DEC", 0);
    Y: InternalNumber = new InternalNumber("DEC", 0);
    M: InternalNumber = new InternalNumber("DEC", 0);
}

export default new CalculatorMemory();