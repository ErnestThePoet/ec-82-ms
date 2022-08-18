import { makeAutoObservable } from "mobx";
import type { KeyEntry } from "../modules/calc-core/objs/key-entry";
import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";

type CalculatorDRGMode = "D" | "R" | "G";
type CalculatorFuncMode = "" | "SHIFT" | "ALPHA" | "HYP" | "STO" | "RCL";

class CalculatorState{
    constructor() {
        makeAutoObservable(this);
    }

    historyEntries: Array<KeyEntry[]> = [];
    entries: KeyEntry[] = [];

    cursorIndex: number = 0;

    calcResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    dispResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    
    isInsert: boolean = true;
    // degree, radian or grade
    drgMode: CalculatorDRGMode = "D";

    funcMode: CalculatorFuncMode = "";

    setCursorIndex(index: number) {
        this.cursorIndex = index;
    }

    setCalcResult(result: InternalNumber) {
        this.calcResult = result;
    }

    setDispResult(result: InternalNumber) {
        this.dispResult = result;
    }

    setIsInsert(insert: boolean) {
        this.isInsert = insert;
    }

    setDRGMode(newMode: CalculatorDRGMode) {
        this.drgMode = newMode;
    }

    setFuncMode(newMode: CalculatorFuncMode) {
        this.funcMode = newMode;
    }

    clearFuncMode() {
        this.funcMode = "";
    }
}

export default new CalculatorState();