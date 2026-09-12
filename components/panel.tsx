import React from "react";
import styles from "../styles/panel.module.scss";

import Screen from "./screen";
import SysKeys from "./sys-keys";
import FuncKeys from "./func-keys";
import BasicKeys from "./basic-keys";

export default class Panel extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divPanelWrapper}>
            <div className={styles.divBrand}>
                <span className={styles.brandCasio}>CASIO</span>
                <span className={styles.brandClasswiz}>CLASSWIZ</span>
            </div>
            <Screen />
            <SysKeys />
            <FuncKeys />
            <BasicKeys />
        </div>
    );
}
