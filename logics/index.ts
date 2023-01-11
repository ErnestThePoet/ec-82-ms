import Decimal from "decimal.js";
import cs from "../observables/calculator-state";
import cm from "../observables/calculator-memory";
import stringsRes from "../observables/strings-res";
import * as LS from "./sys-keys";
import * as LF from "./func-keys";
import * as LB from "./basic-keys";

export const initialize = () => {
    Decimal.set({
        precision: 50
    });

    cm.loadFromLocalStorage();
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
        case "=":
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
        case "Insert":
            inputShiftEntryFromKeyboard(e.key);
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
        case "Home":
            cs.setDisplayMode("NORMAL_EDIT");
            cs.setCursorIndex(0);
            break;
        case "End":
            cs.setDisplayMode("NORMAL_EDIT");
            cs.setCursorIndex(cs.entries.length);
            break;
        case "'":
            LF.onR3C2Click();
            break;
        case ",":
            LF.onR4C5Click();
            break;
        case "(":
        case ")":
        case "s":
        case "S":
            inputNormalEntryFromKeyboard(e.key.toUpperCase());
            break;
        case "a":
        case "A":
        case "b":
        case "B":
        case "c":
        case "C":
        case "d":
        case "D":
        case "e":
        case "E":
        case "f":
        case "F":
        case "x":
        case "X":
        case "y":
        case "Y":
        case "m":
        case "M":
            inputAlphaEntryFromKeyboard(e.key.toUpperCase());
            break;
    }
}

const inputNormalEntryFromKeyboard = (key: string) => {
    cs.clearFuncMode();

    switch (key) {
        case "(":
            LF.onR4C3Click();
            break;
        case ")":
            LF.onR4C4Click();
                break;
        case "S":
            LB.onR4C4Click();
            break;
    }
}

const inputShiftEntryFromKeyboard = (key: string) => {
    cs.setFuncMode("SHIFT");

    switch (key) {
        case "Insert":
            LB.onR1C4Click();
            break;
    }
}

const inputAlphaEntryFromKeyboard = (key: string) => {
    cs.setFuncMode("ALPHA");

    switch (key) {
        case "A":
            LF.onR3C1Click();
            break;
        case "B":
            LF.onR3C2Click();
            break;
        case "C":
            LF.onR3C3Click();
            break;
        case "D":
            LF.onR3C4Click();
            break;
        case "E":
            LF.onR3C5Click();
            break;
        case "F":
            LF.onR3C6Click();
            break;
        case "X":
            LF.onR4C4Click();
            break;
        case "Y":
            LF.onR4C5Click();
            break;
        case "M":
            LF.onR4C6Click();
            break;
    }
}
