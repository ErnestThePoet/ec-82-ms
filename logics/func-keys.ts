import { KEY_ENTRIES } from "../modules/calc-core/objs/key-entry";
import cs from "../observables/calculator-state";
import cm from "../observables/calculator-memory";
import { add, sub } from "../modules/math/internal-number-math";

export const onR1C1Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.fact);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.inv);
    }

    cs.clearFuncMode();
};

export const onR1C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.npr);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.ncr);
    }

    cs.clearFuncMode();
};

export const onR1C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.rec);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.pol);
    }

    cs.clearFuncMode();
};

export const onR1C4Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.cbrt);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.cube);
    }

    cs.clearFuncMode();
};

export const onR2C1Click = () => {
    if (cs.funcMode === "NONE") {
        if (cs.displayMode === "NORMAL_EDIT") {
            cs.inputEntry(KEY_ENTRIES.frac);
        } else if (cs.displayMode === "NORMAL_SHOW") {
            cs.toggleDecFrac();
        }
    }

    cs.clearFuncMode();
};

export const onR2C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.sqrt);
    }

    cs.clearFuncMode();
};

export const onR2C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.sqr);
    }

    cs.clearFuncMode();
};

export const onR2C4Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.root);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.pow);
    }

    cs.clearFuncMode();
};

export const onR2C5Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.exp10);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.log);
    }

    cs.clearFuncMode();
};

export const onR2C6Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.exp);
    } else if (cs.funcMode === "ALPHA") {
        cs.inputEntry(KEY_ENTRIES.e);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.ln);
    }

    cs.clearFuncMode();
};

export const onR3C1Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.A);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.neg);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.A = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.A);
    }

    cs.clearFuncMode();
};

export const onR3C2Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.B);
    } else if (cs.funcMode === "SHIFT") {
        if (cs.displayMode === "NORMAL_SHOW") {
            cs.toggleDecDegree();
        }
    } else if (cs.funcMode === "NONE") {
        if (cs.displayMode === "NORMAL_SHOW") {
            cs.toggleDecDegree();
        } else if (cs.displayMode === "NORMAL_EDIT") {
            cs.inputEntry(KEY_ENTRIES.degree);
        }
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.B = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.B);
    }

    cs.clearFuncMode();
};

export const onR3C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.C);
    } else if (cs.funcMode === "NONE") {
        cs.setFuncMode("HYP");
        return;
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.C = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.C);
    }

    cs.clearFuncMode();
};

export const onR3C4Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.D);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.asin);
    } else if (cs.funcMode === "HYP") {
        cs.inputEntry(KEY_ENTRIES.sinh);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.sin);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.D = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.D);
    }

    cs.clearFuncMode();
};

export const onR3C5Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.E);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.acos);
    } else if (cs.funcMode === "HYP") {
        cs.inputEntry(KEY_ENTRIES.cosh);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.cos);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.E = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.E);
    }

    cs.clearFuncMode();
};

export const onR3C6Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.F);
    } else if (cs.funcMode === "SHIFT") {
        cs.inputEntry(KEY_ENTRIES.atan);
    } else if (cs.funcMode === "HYP") {
        cs.inputEntry(KEY_ENTRIES.tanh);
    } else if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.tan);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.F = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.F);
    }

    cs.clearFuncMode();
};

export const onR4C1Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "SHIFT") {
        cs.setFuncMode("STO");
        return;
    } else if (cs.funcMode === "NONE") {
        cs.setFuncMode("RCL");
        return;
    }

    cs.clearFuncMode();
};

export const onR4C3Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.lBracket);
    }

    cs.clearFuncMode();
};

export const onR4C4Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.rBracket);
    } else if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.X);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.X = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.X);
    }

    cs.clearFuncMode();
};

export const onR4C5Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        cs.inputEntry(KEY_ENTRIES.comma);
    } else if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.Y);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.Y = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.Y);
    }

    cs.clearFuncMode();
};

export const onR4C6Click = () => {
    if (cs.displayMode !== "NORMAL_EDIT" && cs.displayMode !== "NORMAL_SHOW") {
        return;
    }

    if (cs.funcMode === "NONE") {
        if (cs.displayMode === "NORMAL_SHOW") {
            cm.M = add(cm.M, cs.calcResult);
            cs.inputEntry(KEY_ENTRIES.M);
            cs.calcResult = cm.M;
            cs.dispResult = cm.M;
        }
    } else if (cs.funcMode === "SHIFT") {
        if (cs.displayMode === "NORMAL_SHOW") {
            cm.M = sub(cm.M, cs.calcResult);
            cs.inputEntry(KEY_ENTRIES.M);
            cs.calcResult = cm.M;
            cs.dispResult = cm.M;
        }
    } else if (cs.funcMode === "ALPHA" || cs.funcMode === "RCL") {
        cs.inputEntry(KEY_ENTRIES.M);
    } else if (cs.funcMode === "STO" && cs.displayMode === "NORMAL_SHOW") {
        cm.M = cs.calcResult;
        cs.dispResult = cs.calcResult;
        cs.inputEntry(KEY_ENTRIES.M);
    }

    cs.clearFuncMode();
};
