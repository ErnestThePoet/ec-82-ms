import Decimal from "decimal.js";
import cs from "../observables/calculator-state";
import cm from "../observables/calculator-memory";
import stringsRes from "../observables/strings-res";
import * as LS from "./sys-keys";
import * as LF from "./func-keys";
import * as LB from "./basic-keys";
import { KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";

export const initialize = () => {
    Decimal.set({
        precision: 50
    });

    cm.loadFromLocalStorage();
    stringsRes.switchLangFromStorage();

    window.onkeydown = onWindowKeydown;
};

// Keys that the calculator handles. When any of them is pressed we must
// prevent the browser's default behaviour (e.g. Backspace navigating back,
// "/" opening quick search, arrow keys scrolling the page, etc.).
const CALC_KEYS: ReadonlySet<string> = new Set([
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ".", ",", "'", "(", ")",
    "+", "-", "*", "/", "=", "^", "!", "%",
    "Enter", "Backspace", "Delete", "Insert",
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "Home", "End", "Escape",
    "s", "S", "a", "A", "b", "B", "c", "C", "d", "D",
    "e", "E", "f", "F", "x", "X", "y", "Y", "m", "M",
    "p", "P", "h", "H", "NumpadDecimal"
]);

// Only inject a raw entry when the calculator is in an editable state.
const canInputEntry = () =>
    cs.displayMode === "NORMAL_EDIT" || cs.displayMode === "NORMAL_SHOW";

const onWindowKeydown = (e: KeyboardEvent) => {
    if (CALC_KEYS.has(e.key)) {
        e.preventDefault();
    }

    switch (e.key) {
        case "0":
            LB.onR4C1Click();
            break;
        case ".":
        case "NumpadDecimal":
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
            } else {
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
        // ---- extra symbol / shortcut keys ----
        case "^":
            if (canInputEntry()) {
                cs.clearFuncMode();
                cs.inputEntry(KEY_ENTRIES.pow);
            }
            break;
        case "!":
            if (canInputEntry()) {
                cs.clearFuncMode();
                cs.inputEntry(KEY_ENTRIES.fact);
            }
            break;
        case "%":
            if (canInputEntry()) {
                cs.clearFuncMode();
                cs.inputEntry(KEY_ENTRIES.percent);
            }
            break;
        case "p":
        case "P":
            if (canInputEntry()) {
                cs.clearFuncMode();
                cs.inputEntry(KEY_ENTRIES.PI);
            }
            break;
        case "h":
        case "H":
            if (canInputEntry()) {
                cs.setHypMode(!cs.hypMode);
            }
            break;
        case "Escape":
            // Exit from overlay menus / error, otherwise just clear
            // the current function (shift / alpha / ...) mode.
            if (
                cs.displayMode === "DRG" ||
                cs.displayMode === "LANG" ||
                cs.displayMode === "CLEAR" ||
                cs.displayMode === "ABOUT"
            ) {
                cs.setDisplayMode("NORMAL_EDIT");
            } else if (cs.displayMode === "ERROR") {
                cs.setDisplayMode("NORMAL_EDIT");
                cs.setCursorIndex(cs.entries.length);
            } else {
                cs.clearFuncMode();
            }
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
};

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
};

const inputShiftEntryFromKeyboard = (key: string) => {
    cs.setFuncMode("SHIFT");

    switch (key) {
        case "Insert":
            LB.onR1C4Click();
            break;
    }
};

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
};
