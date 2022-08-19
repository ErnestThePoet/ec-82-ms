import Decimal from "decimal.js";
import calculatorMemory from "../observables/calculator-memory";
import stringsRes from "../observables/strings-res";

export const initialize = () => {
    Decimal.set({
        precision: 50
    });

    calculatorMemory.loadFromLocalStorage();
    stringsRes.switchLangFromStorage();
}