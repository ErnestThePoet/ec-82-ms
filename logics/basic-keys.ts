import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";
import { KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import cs from "../observables/calculator-state";
import fx from "../observables/fx991-state";
import * as FX from "./fx991";

const fxActive = (): boolean => FX.isFxModeActive();

export const onR1C1Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("7");
        } else {
            FX.onDigit("7");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n7);
    }

    cs.clearFuncMode();
};

export const onR1C2Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("8");
        } else {
            FX.onDigit("8");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n8);
    }

    cs.clearFuncMode();
};

export const onR1C3Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("9");
        } else {
            FX.onDigit("9");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n9);
    }

    cs.clearFuncMode();
};

export const onR1C4Click = () => {
    if (fxActive()) {
        FX.onDel();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        if (cs.displayMode === "NORMAL_EDIT") {
            cs.deleteEntry();
        }
    } else if (cs.funcMode === "SHIFT") {
        cs.toggleIsInsert();
    }

    cs.clearFuncMode();
};

export const onR1C5Click = () => {
    if (fxActive()) {
        FX.onAc();
        cs.clearFuncMode();
        return;
    }
    if (cs.funcMode === "SHIFT") {
        cs.setDisplayMode("ABOUT");
    } else {
        cs.setDisplayMode("NORMAL_EDIT");
        cs.entries = [];
        cs.setCursorIndex(0);
        cs.setEntryIndex(cs.historyEntries.length);
        cs.dispResult = new InternalNumber("DEC", new Decimal(0));
    }

    cs.clearFuncMode();
};

export const onR2C1Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("4");
        } else {
            FX.onDigit("4");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n4);
    }

    cs.clearFuncMode();
};

export const onR2C2Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("5");
        } else {
            FX.onDigit("5");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n5);
    }

    cs.clearFuncMode();
};

export const onR2C3Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("6");
        } else {
            FX.onDigit("6");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n6);
    }

    cs.clearFuncMode();
};

export const onR2C4Click = () => {
    if (fxActive()) {
        FX.onMul();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.mul);
    }

    cs.clearFuncMode();
};

export const onR2C5Click = () => {
    if (fxActive()) {
        FX.onDiv();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.div);
    }

    cs.clearFuncMode();
};

export const onR3C1Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("1");
        } else {
            FX.onDigit("1");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n1);
    }

    cs.clearFuncMode();
};

export const onR3C2Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("2");
        } else {
            FX.onDigit("2");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n2);
    }

    cs.clearFuncMode();
};

export const onR3C3Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("3");
        } else {
            FX.onDigit("3");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n3);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.fromD);
    }

    cs.clearFuncMode();
};

export const onR3C4Click = () => {
    if (fxActive()) {
        FX.onAdd();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.add);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.fromR);
    }

    cs.clearFuncMode();
};

export const onR3C5Click = () => {
    if (fxActive()) {
        FX.onSub();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.sub);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.fromG);
    }

    cs.clearFuncMode();
};

export const onR4C1Click = () => {
    if (fxActive()) {
        if (cs.funcMode === "SHIFT") {
            FX.onShiftDigit("0");
        } else {
            FX.onDigit("0");
        }
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n0);
    }

    cs.clearFuncMode();
};

export const onR4C2Click = () => {
    if (fxActive()) {
        FX.onDot();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.nDot);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.RAN);
    }

    cs.clearFuncMode();
};

export const onR4C3Click = () => {
    if (fxActive()) {
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.exp10);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.PI);
    }

    cs.clearFuncMode();
};

export const onR4C4Click = () => {
    if (fxActive()) {
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.ANS);
    }

    cs.clearFuncMode();
};

export const onR4C5Click = () => {
    if (fxActive()) {
        FX.onEq();
        cs.clearFuncMode();
        return;
    }
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.calculate();
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.percent);
    }

    cs.clearFuncMode();
};
