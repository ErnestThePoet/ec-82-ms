import { makeAutoObservable } from "mobx";
import {
    KeyEntry,
    isOpBinary,
    isOpUnaryR,
    KEY_ENTRIES
} from "../modules/calc-core/objs/key-entry";
import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";
import {
    getDegreeValue,
    getDecValue,
    getFracValue
} from "../modules/math/internal-number-math";
import { preprocess } from "../modules/calc-core/preprocessing";
import { parse } from "../modules/calc-core/parse";
import { calculate } from "../modules/calc-core/calculate";
import calculatorMemory from "./calculator-memory";

type CalculatorDisplayMode =
    | "NORMAL_EDIT"
    | "NORMAL_SHOW"
    | "ERROR"
    | "CLEAR"
    | "DRG"
    | "LANG"
    | "ABOUT";
export type CalculatorDRGMode = "D" | "R" | "G";
type CalculatorFuncMode = "NONE" | "SHIFT" | "ALPHA" | "STO" | "RCL";

class CalculatorState {
    constructor() {
        makeAutoObservable(this);
    }

    historyEntries: Array<KeyEntry[]> = [];
    entries: KeyEntry[] = [];

    entryIndex: number = 0;
    cursorIndex: number = 0;

    calcResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));
    dispResult: InternalNumber = new InternalNumber("DEC", new Decimal(0));

    errorMessage: string = "";

    /////////////// Modes
    isInsert: boolean = true;

    displayMode: CalculatorDisplayMode = "NORMAL_EDIT";

    // degree, radian or grade
    drgMode: CalculatorDRGMode = "D";

    // special function mode: shift, alpha, ...
    funcMode: CalculatorFuncMode = "NONE";

    // hyp mode, a standalone function mode
    hypMode: boolean = false;

    inputEntry(ke: KeyEntry) {
        switch (this.displayMode) {
            case "NORMAL_EDIT":
                if (this.isInsert) {
                    this.entries.splice(this.cursorIndex, 0, ke);
                    this.setCursorIndex(this.cursorIndex + 1);
                } else {
                    if (this.cursorIndex >= this.entries.length) {
                        this.entries.push(ke);
                        this.setCursorIndex(this.entries.length);
                    } else {
                        this.entries[this.cursorIndex] = ke;
                    }
                }
                break;
            case "NORMAL_SHOW":
                if (isOpBinary(ke) || isOpUnaryR(ke)) {
                    this.entries = [KEY_ENTRIES.ANS, ke];
                } else {
                    this.entries = [ke];
                }

                this.setCursorIndex(this.entries.length);
                // start new entry
                this.setEntryIndex(this.historyEntries.length);
                this.displayMode = "NORMAL_EDIT";
                break;
        }
    }

    deleteEntry() {
        if (this.displayMode === "NORMAL_EDIT") {
            // when cursor is not at beginning, delete the entry before cursor
            if (this.cursorIndex - 1 >= 0) {
                this.entries.splice(this.cursorIndex - 1, 1);
                this.setCursorIndex(this.cursorIndex - 1);
            }
            // if cursor is at beginning, delete the first entry
            else if (this.cursorIndex === 0) {
                if (this.entries.length > 0) {
                    this.entries.shift();
                }
            }
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
    }

    setCalcResult(result: InternalNumber) {
        this.calcResult = result;
    }

    setDispResult(result: InternalNumber) {
        this.dispResult = result;
    }

    toggleIsInsert() {
        this.isInsert = !this.isInsert;
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

    setHypMode(hypMode: boolean) {
        this.hypMode = hypMode;
    }

    clearFuncMode() {
        this.funcMode = "NONE";
        this.hypMode = false;
    }

    toggleDecFrac() {
        switch (this.dispResult.type) {
            case "DEC":
            case "DEGREE":
                this.dispResult = new InternalNumber(
                    "FRAC",
                    getFracValue(this.calcResult)
                );
                break;
            case "FRAC":
                this.dispResult = new InternalNumber(
                    "DEC",
                    getDecValue(this.calcResult)
                );
                break;
        }
    }

    toggleDecDegree() {
        switch (this.dispResult.type) {
            case "DEC":
            case "FRAC":
                this.dispResult = new InternalNumber(
                    "DEGREE",
                    getDegreeValue(this.calcResult)
                );
                break;
            case "DEGREE":
                this.dispResult = new InternalNumber(
                    "DEC",
                    getDecValue(this.calcResult)
                );
                break;
        }
    }

    calculate() {
        if (this.entries.length === 0) {
            return;
        }
        const entriesCopy = preprocess(this.entries);

        const parseResult = parse(entriesCopy);
        if (!parseResult.success) {
            this.errorMessage = parseResult.msg;
            this.displayMode = "ERROR";
            return;
        }

        const calculateResult = calculate(parseResult.lexems);
        if (!calculateResult.success) {
            this.errorMessage = calculateResult.msg;
            this.displayMode = "ERROR";
            return;
        }

        this.historyEntries.push(Object.assign([], this.entries));
        this.entryIndex = this.historyEntries.length - 1;

        this.calcResult = calculateResult.result!;

        // for integer frac values, display in integer
        const decCalcResult = getDecValue(this.calcResult);
        if (this.calcResult.type === "FRAC" && decCalcResult.isInteger()) {
            this.dispResult = new InternalNumber("DEC", decCalcResult);
        } else {
            this.dispResult = calculateResult.result!;
        }

        calculatorMemory.ans = calculateResult.result!;

        this.displayMode = "NORMAL_SHOW";
    }
}

export default new CalculatorState();
