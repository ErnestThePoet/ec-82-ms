import Decimal from "decimal.js";
import calculatorMemory from "../observables/calculator-memory";
import stringsRes from "../observables/strings-res";
import * as LS from "./sys-keys";
import * as LF from "./func-keys";
import * as LB from "./basic-keys";

export const initialize = () => {
    Decimal.set({
        precision: 50
    });

    calculatorMemory.loadFromLocalStorage();
    stringsRes.switchLangFromStorage();

    window.onkeydown = onWindowKeydown;
}

const onWindowKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
        case "0":
            LB.onR4C1Click();
            break;
        case ".":
            LB.onR4C2Click();
            break;
        case "Enter":
            LB.onR4C5Click();
            break;
        case "1":
            LB.onR3C1Click();
            break;
        case "2":
            LB.onR3C2Click();
            break;
        case "3":
            LB.onR3C3Click();
            break;
        case "+":
            LB.onR3C4Click();
            break;
        case "-":
            LB.onR3C5Click();
            break;
        case "4":
            LB.onR2C1Click();
            break;
        case "5":
            LB.onR2C2Click();
            break;
        case "6":
            LB.onR2C3Click();
            break;
        case "*":
            LB.onR2C4Click();
            break;
        case "/":
            if (e.code === "NumpadDivide") {
                LB.onR2C5Click();
            }
            else {
                LF.onR2C1Click();
            }
            
            break;
        case "7":
            LB.onR1C1Click();
            break;
        case "8":
            LB.onR1C2Click();
            break;
        case "9":
            LB.onR1C3Click();
            break;
        case "Backspace":
            LB.onR1C4Click();
            break;
        case "Delete":
            LB.onR1C5Click();
            break;
        case "Shift":
            LS.onShiftClick();
            break;
        case "ArrowUp":
            LS.onDirClick("U");
            break;
        case "ArrowDown":
            LS.onDirClick("D");
            break;
        case "ArrowLeft":
            LS.onDirClick("L");
            break;
        case "ArrowRight":
            LS.onDirClick("R");
            break;
        case "'":
            LF.onR3C2Click();
            break;
        case ",":
            LF.onR4C5Click();
            break;
    }
}