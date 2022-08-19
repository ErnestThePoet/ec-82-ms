import React from "react";
import styles from "../styles/sys-keys.module.scss";
import Key from "./key";

export default class SysKeys extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divSysKeys}>
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
                <span>▲</span>
                <span>▲</span>
                <span>▲</span>
                <span>▲</span>
            </div>
        </div>
    )
}