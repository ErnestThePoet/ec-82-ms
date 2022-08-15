import { makeAutoObservable } from "mobx";

type CalculatorValueType = "DEC" | "FRAC";
type CalculatorDRGMode = "D" | "R" | "G";

class CalculatorState{
    constructor() {
        makeAutoObservable(this);
    }
    
    // whether in fraction calculation mode or decimal.
    valueType: CalculatorValueType = "DEC";
    
    // degree, radian or grade
    drgMode: CalculatorDRGMode = "D";

    // shift
    shift: boolean = false;
    // alpha
    alpha: boolean = false;
    // hyp
    hyp: boolean = false;

    setValueType(newType: CalculatorValueType) {
        this.valueType = newType;
    }

    setDRGMode(newMode: CalculatorDRGMode) {
        this.drgMode = newMode;
    }

    setShift(newShift:boolean) {
        this.shift = newShift;

        if (newShift) {
            this.alpha = false;
        }
    }

    setAlpha(newAlpha: boolean) {
        this.alpha = newAlpha;

        if (newAlpha) {
            this.shift = false;
        }
    }

    setHyp(newHyp: boolean) {
        this.hyp = newHyp;
    }
}

export default new CalculatorState();