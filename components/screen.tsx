import React from "react";
import { observer } from "mobx-react-lite";
import calculatorState, { DISPLAY_LENGTH } from "../observables/calculator-state";
import styles from "../styles/screen.module.scss";
import stringsRes from "../observables/strings-res";
import * as L from "../logics/screen";

export default class Screen extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    ThisComponent = observer(() => (
        <div className={styles.divScreenWrapper}>
            {
                (calculatorState.displayMode === "NORMAL_EDIT"
                    || calculatorState.displayMode === "NORMAL_SHOW"
                    || calculatorState.displayMode === "ERROR") &&
                <div className={styles.divNormalWrapper}>
                    <div role="entries">
                        {
                            calculatorState.entries
                                .slice(calculatorState.dispStartIndex,
                                    calculatorState.dispStartIndex + DISPLAY_LENGTH)
                                .map((x, i) => (
                                    <img key={i}
                                        className={calculatorState.displayMode === "NORMAL_EDIT"
                                            && i === calculatorState.cursorIndex
                                            ? (calculatorState.isInsert
                                                ? styles.imgInsert
                                                : styles.imgOverwrite)
                                            : ""}
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(x.svg)}`} />
                                ))
                        }
                        <img
                                className={calculatorState.displayMode === "NORMAL_EDIT"
                                    && calculatorState.cursorIndex
                                === calculatorState.entries.length
                                ? (calculatorState.isInsert
                                    ? styles.imgInsert
                                    : styles.imgOverwrite)
                                : ""}
                            src={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2.262ex" height="0" viewBox="0 0 1000 0" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mstyle"><g data-mml-node="mspace"></g></g></g></g></svg>')}`} />
                    </div>

                    {
                        calculatorState.displayMode === "ERROR" &&
                        <div role="error">
                            {calculatorState.errorMessage}
                        </div>
                    }

                    {
                        calculatorState.displayMode !== "ERROR" &&
                        <div role="result">
                            {calculatorState.dispResult.toString()}
                        </div>
                    }

                    <div role="mode">
                        <span>
                            {calculatorState.funcMode === "NONE"
                                ? ""
                                : calculatorState.funcMode}
                        </span>

                        <span>
                            {calculatorState.drgMode}
                        </span>
                    </div>
                </div>
            }

            {
                calculatorState.displayMode === "DRG" &&
                <div className={styles.divDrgWrapper}>
                    <div onClick={() => L.onDrgClick("D")}>
                        {stringsRes.strings.DEG}
                    </div>
                    <div onClick={() => L.onDrgClick("R")}>
                        {stringsRes.strings.RAD}
                    </div>
                    <div onClick={() => L.onDrgClick("G")}>
                        {stringsRes.strings.GRA}
                    </div>
                </div>
            }

            {
                calculatorState.displayMode === "CLEAR" &&
                <div className={styles.divClearWrapper}>
                    <div onClick={() => L.onClearClick(0)}>
                        {stringsRes.strings.CLEAR[0]}
                    </div>
                    <div onClick={() => L.onClearClick(1)}>
                        {stringsRes.strings.CLEAR[1]}
                    </div>
                    <div onClick={() => L.onClearClick(2)}>
                        {stringsRes.strings.CLEAR[2]}
                    </div>
                </div>
            }

            {
                calculatorState.displayMode === "LANG" &&
                <div className={styles.divLangWrapper}>
                    <div onClick={() => L.onLangClick("ZH_CN")}>
                        中文
                    </div>
                    <div onClick={() => L.onLangClick("EN")}>
                        English
                    </div>
                </div>
            }

            {
                calculatorState.displayMode === "ABOUT" &&
                <div className={styles.divAboutWrapper}>
                    <title>{"Ernest's Web Calculator EC-82MS"}</title>
                    <title>{"Made with LOVE❤️ by Ernest Cui"}</title>
                    <title>{"August, 2022"}</title>
                    <div>
                        Repositories:
                        <a href="https://github.com/ErnestThePoet/EC-82MS">Github</a>
                        <a href="https://gitee.com/ecui/ec-82-ms">Gitee</a>
                    </div>
                </div>
            }
        </div>
    ));

    render = () => (
        <this.ThisComponent />
    );
}