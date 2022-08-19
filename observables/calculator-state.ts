import { makeAutoObservable } from "mobx";
import type { KeyEntry } from "../modules/calc-core/objs/key-entry";
import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";
import {
    getDegreeValue,
    getDecValue,
    getFracValue
} from "../modules/math/internal-number-math";

type CalculatorDisplayMode = "NORMAL_EDIT" |"NORMAL_SHOW"|"ERROR"| "CLEAR" | "DRG" | "FROM_DRG" | "LANG" | "ABOUT";
type CalculatorDRGMode = "D" | "R" | "G";
type CalculatorFuncMode = "NONE" | "SHIFT" | "ALPHA" | "HYP" | "STO" | "RCL";

export const DISPLAY_LENGTH = 10;

class CalculatorState{
    constructor() {
        makeAutoObservable(this);
    }

    historyEntries: Array<KeyEntry[]> = [];
    entries: KeyEntry[] = [];

    entryIndex: number = 0;
    cursorIndex: number = 0;
    dispStartIndex: number = 0;

    calcResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    dispResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    
    /////////////// Modes
    isInsert: boolean = true;

    displayMode: CalculatorDisplayMode = "NORMAL_EDIT";

    // degree, radian or grade
    drgMode: CalculatorDRGMode = "D";

    // special function mode: shift, alpha, ...
    funcMode: CalculatorFuncMode = "NONE";

    inputEntry(ke: KeyEntry) {
        switch (this.displayMode) {
            case "NORMAL_EDIT":
                if (this.isInsert) {
                    this.entries.splice(this.entryIndex, 0, ke);
                }
                else {
                    if (this.entryIndex >= this.entries.length) {
                        this.entries.push(ke);
                    }
                    else {
                        this.entries[this.entryIndex] = ke;
                    }
                }
                break;
            case "NORMAL_SHOW":
                this.entries = [ke];
                break;
        }
    }

    setEntryIndex(index: number) {
        this.entryIndex = index;
    }

    // cursor index can be [0,this.entries.length]
    setCursorIndex(index: number) {
        if (index < 0) {
            index = 0;
        }

        if (index > this.entries.length) {
            index = this.entries.length;
        }

        this.cursorIndex = index;

        if (index < this.dispStartIndex
            || index >= this.dispStartIndex + DISPLAY_LENGTH) {
            this.dispStartIndex = index;
        }
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

    setDisplayMode(newMode: CalculatorDisplayMode) {
        this.displayMode = newMode;
    }

    setDRGMode(newMode: CalculatorDRGMode) {
        this.drgMode = newMode;
    }

    setFuncMode(newMode: CalculatorFuncMode) {
        this.funcMode = newMode;
    }

    clearFuncMode() {
        this.funcMode = "NONE";
    }

    toggleDecFrac() {
        switch (this.dispResult.type) {
            case "DEC":
            case "DEGREE":
                this.dispResult =
                    new InternalNumber("FRAC", getFracValue(this.calcResult));
                break;
            case "FRAC":
                this.dispResult =
                    new InternalNumber("DEC", getDecValue(this.calcResult));
                break;
        }
    }

    toggleDecDegree() {
        switch (this.dispResult.type) {
            case "DEC":
            case "FRAC":
                this.dispResult =
                    new InternalNumber("DEGREE", getDegreeValue(this.calcResult));
                break;
            case "DEGREE":
                this.dispResult =
                    new InternalNumber("DEC", getDecValue(this.calcResult));
                break;
        }
    }
}

export default new CalculatorState();