import React from "react";
import classNames from "classnames";
import styles from "../styles/sys-keys.module.scss";
import stylesP from "../styles/panel.module.scss";
import Key from "./key";

export default class SysKeys extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={classNames(styles.divSysKeys,
            "d-flex justify-content-between")}>
            <div>
                <Key role="ksys"
                    upperContent={
                        <span role="klg">
                            SHIFT
                        </span>
                    }
                    onClick={() => { }} ></Key>
                <Key role="ksys"
                    upperContent={
                        <span role="klo">
                            ALPHA
                        </span>
                    }
                    onClick={() => { }} ></Key>
            </div>

            <div>
                <Key role="ksys"
                    upperContent={
                        <span role="klg">
                            MODE CLR
                        </span>
                    }
                    onClick={() => { }} ></Key>
                <Key role="ksys"
                    upperContent={
                        <span role="klg">
                            LANG
                        </span>
                    }
                    onClick={() => { }} ></Key>
            </div>

            <div role="kdir">
                <i className="fa-solid fa-caret-up"></i>
                <i className="fa-solid fa-caret-up"></i>
                <i className="fa-solid fa-caret-up"></i>
                <i className="fa-solid fa-caret-up"></i>
            </div>
        </div>
    )
}