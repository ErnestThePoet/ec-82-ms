import cs from "../observables/calculator-state";
import fx from "../observables/fx991-state";
import * as FX from "./fx991";

export const onShiftClick = () => {
    if (cs.funcMode === "SHIFT") {
        cs.setFuncMode("NONE");
    } else {
        cs.setFuncMode("SHIFT");
    }
};

export const onAlphaClick = () => {
    if (cs.funcMode === "ALPHA") {
        cs.setFuncMode("NONE");
    } else {
        cs.setFuncMode("ALPHA");
    }
};

export const onDirClick = (dir: "U" | "D" | "L" | "R") => {
    cs.clearFuncMode();
    if (cs.displayMode === "NORMAL_EDIT") {
        switch (dir) {
            case "U":
                // prevent losing input data
                if (cs.entries.length !== 0) {
                    return;
                }
                if (cs.entryIndex - 1 >= 0) {
                    cs.entryIndex--;
                    cs.entries = Object.assign(
                        [],
                        cs.historyEntries[cs.entryIndex]
                    );
                    cs.setCursorIndex(cs.entries.length);
                    cs.setDisplayMode("NORMAL_SHOW");
                }
                break;
            case "D":
                if (cs.entries.length !== 0) {
                    return;
                }
                if (cs.entryIndex + 1 < cs.historyEntries.length) {
                    cs.entryIndex++;
                    cs.entries = Object.assign(
                        [],
                        cs.historyEntries[cs.entryIndex]
                    );
                    cs.setCursorIndex(cs.entries.length);
                    cs.setDisplayMode("NORMAL_SHOW");
                }
                break;
            case "L":
                if (cs.cursorIndex - 1 >= 0) {
                    cs.setCursorIndex(cs.cursorIndex - 1);
                }
                break;
            case "R":
                if (cs.cursorIndex + 1 <= cs.entries.length) {
                    cs.setCursorIndex(cs.cursorIndex + 1);
                }
                break;
        }
    } else if (cs.displayMode === "NORMAL_SHOW") {
        switch (dir) {
            case "U":
                if (cs.entryIndex - 1 >= 0) {
                    cs.entryIndex--;
                    cs.entries = Object.assign(
                        [],
                        cs.historyEntries[cs.entryIndex]
                    );
                    cs.setCursorIndex(cs.entries.length);
                }
                break;
            case "D":
                if (cs.entryIndex + 1 < cs.historyEntries.length) {
                    cs.entryIndex++;
                    cs.entries = Object.assign(
                        [],
                        cs.historyEntries[cs.entryIndex]
                    );
                    cs.setCursorIndex(cs.entries.length);
                }
                break;
            case "L":
            case "R":
                cs.setDisplayMode("NORMAL_EDIT");
                cs.setCursorIndex(cs.entries.length);
                break;
        }
    } else if (cs.displayMode === "ERROR") {
        switch (dir) {
            case "L":
            case "R":
                cs.setDisplayMode("NORMAL_EDIT");
                cs.setCursorIndex(cs.entries.length);
                break;
        }
    }
};

export const onModeClrClick = () => {
    // FX-991 进化：MODE 键打开模式菜单（计算/复数/进制/方程/统计/角度）
    if (cs.funcMode === "SHIFT") {
        // SHIFT + MODE：保留原全清菜单
        if (
            cs.displayMode === "NORMAL_EDIT" ||
            cs.displayMode === "NORMAL_SHOW"
        ) {
            cs.setDisplayMode("CLEAR");
        }
        cs.clearFuncMode();
        return;
    }

    if (cs.displayMode === "DRG") {
        // DRG 菜单下按 MODE 返回
        cs.setDisplayMode("NORMAL_EDIT");
        cs.clearFuncMode();
        return;
    }

    if (fx.showModeMenu) {
        FX.onCloseModeMenu();
    } else {
        FX.onOpenModeMenu();
    }
    cs.clearFuncMode();
};

export const onLangClick = () => {
    if (cs.displayMode === "LANG") {
        cs.setDisplayMode("NORMAL_EDIT");
    } else if (
        cs.displayMode === "NORMAL_EDIT" ||
        cs.displayMode === "NORMAL_SHOW"
    ) {
        if (cs.funcMode === "NONE") {
            cs.setDisplayMode("LANG");
        }
    }

    cs.clearFuncMode();
};
