import Decimal from "decimal.js";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";
import { KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import cs from "../observables/calculator-state";

export const onR1C1Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n7);
    }

    cs.clearFuncMode();
};

export const onR1C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n8);
    }

    cs.clearFuncMode();
};

export const onR1C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n9);
    }

    cs.clearFuncMode();
};

export const onR1C4Click = () => {
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
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n4);
    }

    cs.clearFuncMode();
};

export const onR2C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n5);
    }

    cs.clearFuncMode();
};

export const onR2C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n6);
    }

    cs.clearFuncMode();
};

export const onR2C4Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.mul);
    }

    cs.clearFuncMode();
};

export const onR2C5Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.div);
    }

    cs.clearFuncMode();
};

export const onR3C1Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n1);
    }

    cs.clearFuncMode();
};

export const onR3C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n2);
    }

    cs.clearFuncMode();
};

export const onR3C3Click = () => {
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
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.n0);
    }

    cs.clearFuncMode();
};

export const onR4C2Click = () => {
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
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.ANS);
    }

    cs.clearFuncMode();
};

export const onR4C5Click = () => {
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
