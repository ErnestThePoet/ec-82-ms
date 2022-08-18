import React from "react";
import classNames from "classnames";
import styles from "../styles/sys-keys.module.scss";
import SysKey from "./key/sys-key";

export default class SysKeys extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={classNames(styles.divSysKeys,
            "d-flex justify-content-between")}>
            <div>
                <SysKey
                    upperContent={
                        <span role="kl" className={styles.spanSysKeyLabelGreen}>
                            SHIFT
                        </span>
                    }
                    onClick={() => { }} ></SysKey>
                <SysKey
                    upperContent={
                        <span role="kl" className={styles.spanSysKeyLabelOrange}>
                            ALPHA
                        </span>
                    }
                    onClick={() => { }} ></SysKey>
            </div>

            <div>
                <SysKey
                    upperContent={
                        <span role="kl" className={styles.spanSysKeyLabelGreen}>
                            MODE CLR
                        </span>
                    }
                    onClick={() => { }} ></SysKey>
                <SysKey
                    upperContent={
                        <span role="kl" className={styles.spanSysKeyLabelGreen}>
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
    )
}