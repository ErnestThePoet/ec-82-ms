import React from "react";
import classNames from "classnames";
import styles from "../styles/panel.module.scss";

import Screen from "./screen";
import SysKeys from "./sys-keys";
import FuncKeys from "./func-keys";


export default class Panel extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={classNames(
            styles.divPanelWrapper,
            "d-flex flex-column align-items-center")}>
            
            <Screen/>
            <SysKeys />
            <FuncKeys/>

            
            
        </div>
    )
}