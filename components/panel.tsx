import React from "react";
import classNames from "classnames";
import styles from "../styles/panel.module.scss";

import Screen from "./screen";
import SysKey from "./sys-key";

export default class Panel extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={classNames(
            styles.divPanelWrapper,
            "d-flex flex-column align-items-center")}>
            
            <Screen/>
            
            <div className={classNames(styles.divSysKeys,
                "d-flex justify-content-between")}>
                <div>
                    <SysKey
                        upperContent={
                            <span className={styles.spanSysKeyLabelGreen}>
                                SHIFT
                            </span>
                        }
                        onClick={() => { }} ></SysKey>
                    <SysKey
                        upperContent={
                            <span className={styles.spanSysKeyLabelOrange}>
                                ALPHA
                            </span>
                        }
                        onClick={() => { }} ></SysKey>
                </div>

                <div>
                    <SysKey
                        upperContent={
                            <span className={styles.spanSysKeyLabelGreen}>
                                MODE CLR
                            </span>
                        }
                        onClick={() => { }} ></SysKey>
                    <SysKey
                        upperContent={
                            <span className={styles.spanSysKeyLabelGreen}>
                                LANG
                            </span>
                        }
                        onClick={() => { }} ></SysKey>
                </div>

                <div role="key" className={styles.divDirKeys}>
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-up"></i>
                </div>
            </div>
            
        </div>
    )
}