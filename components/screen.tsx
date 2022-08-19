import React from "react";
import { observer } from "mobx-react-lite";
import calculatorState, { DISPLAY_LENGTH } from "../observables/calculator-state";
import styles from "../styles/screen.module.scss";

export default class Screen extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    ThisComponent = observer(() => (
        <div className={styles.divScreenWrapper}>
            {
                (calculatorState.displayMode === "NORMAL_EDIT"
                    || calculatorState.displayMode === "NORMAL_SHOW") &&
                <div className={styles.divNormalWrapper}>
                    <div role="entries">
                        {
                            calculatorState.entries
                                .slice(calculatorState.dispStartIndex,
                                    calculatorState.dispStartIndex + DISPLAY_LENGTH)
                                .map((x, i) => (
                                    <img key={i}
                                        className={i === calculatorState.cursorIndex
                                            ? (calculatorState.isInsert
                                                ? styles.imgInsert
                                                : styles.imgOverwrite)
                                            : ""}
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(x.svg)}`} />
                                ))
                            }
                            <img
                                className={calculatorState.cursorIndex
                                    === calculatorState.entries.length
                                    ? (calculatorState.isInsert
                                        ? styles.imgInsert
                                        : styles.imgOverwrite)
                                    : ""}
                                src={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2.262ex" height="0" viewBox="0 0 1000 0" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mstyle"><g data-mml-node="mspace"></g></g></g></g></svg>')}`} />
                    </div>

                    <div role="result">
                        {calculatorState.dispResult.toString()}
                    </div>
                </div>
            }
        </div>
    ));

    render = () => (
        <this.ThisComponent />
    );
}