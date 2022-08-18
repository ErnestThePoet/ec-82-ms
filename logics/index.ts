import Decimal from "decimal.js";
import calculatorMemory from "../observables/calculator-memory";

export const initialize = () => {
    Decimal.set({
        precision: 50
    });

    calculatorMemory.loadFromLocalStorage();
}