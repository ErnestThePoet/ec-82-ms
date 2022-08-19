import React from "react";
import { observer } from "mobx-react-lite";
import calculatorState from "../observables/calculator-state";
import styles from "../styles/screen.module.scss";

export default class Screen extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    ThisComponent = observer(() => (
        <div className={styles.divScreenWrapper}>
            {
                calculatorState.displayMode === "NORMAL" &&
                <div className={styles.divNormalWrapper}>
                    
                </div>
            }
        </div>
    ));

    render = () => (
        <this.ThisComponent />
    );
}