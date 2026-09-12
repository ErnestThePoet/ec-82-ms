import React from "react";
import styles from "../styles/sys-keys.module.scss";
import Key from "./key";
import * as L from "../logics/sys-keys";

export default class SysKeys extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divSysKeys}>
            <div>
                <Key
                    role="ksys"
                    upperContent={<span role="klg">SHIFT</span>}
                    onClick={() => {
                        L.onShiftClick();
                    }}></Key>
                <Key
                    role="ksys"
                    upperContent={<span role="klo">ALPHA</span>}
                    onClick={() => {
                        L.onAlphaClick();
                    }}></Key>
            </div>

            <div>
                <Key
                    role="ksys"
                    upperContent={<span role="klg">菜单</span>}
                    onClick={() => {
                        L.onModeClrClick();
                    }}></Key>
                <Key
                    role="ksys"
                    upperContent={<span role="klg">设置</span>}
                    onClick={() => {
                        L.onLangClick();
                    }}></Key>
            </div>

            <div role="kdir">
                <span
                    onClick={() => {
                        L.onDirClick("U");
                    }}>
                    ▲
                </span>
                <span
                    onClick={() => {
                        L.onDirClick("L");
                    }}>
                    ▲
                </span>
                <span
                    onClick={() => {
                        L.onDirClick("D");
                    }}>
                    ▲
                </span>
                <span
                    onClick={() => {
                        L.onDirClick("R");
                    }}>
                    ▲
                </span>
            </div>
        </div>
    );
}
