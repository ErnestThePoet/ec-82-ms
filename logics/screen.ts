import cs, { CalculatorDRGMode } from "../observables/calculator-state";
import cm from "../observables/calculator-memory";
import { InternalNumber } from "../modules/calc-core/objs/internal-number";
import Decimal from "decimal.js";
import sr, { LangType } from "../observables/strings-res";

export const onKeyEntryImgClick = (index: number) => {
    cs.setDisplayMode("NORMAL_EDIT");
    cs.setCursorIndex(index);
};

export const onDrgClick = (drg: CalculatorDRGMode) => {
    cs.setDRGMode(drg);
    cs.setDisplayMode("NORMAL_EDIT");
};

export const onClearClick = (mode: 0 | 1 | 2) => {
    switch (mode) {
        case 2:
            cs.setDRGMode("D");
            cs.isInsert = true;
        case 0:
            cm.clear();
            cs.entries = [];
            cs.historyEntries = [];
            cs.calcResult = new InternalNumber("DEC", new Decimal(0));
            cs.dispResult = new InternalNumber("DEC", new Decimal(0));
            cs.setEntryIndex(0);
            cs.setCursorIndex(0);
            break;
        case 1:
            cs.setDRGMode("D");
            cs.isInsert = true;
            break;
    }

    cs.setDisplayMode("NORMAL_EDIT");
};

export const onLangClick = (lang: LangType) => {
    sr.switchLanguage(lang);
    cs.setDisplayMode("NORMAL_EDIT");
};
