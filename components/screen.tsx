import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import styles from "../styles/screen.module.scss";

export default class Screen extends React.Component{
    constructor(props: {}) {
        super(props);
    }

    ThisComponent = observer(() => (
        <div className={styles.divScreenWrapper}>
            SCREEN
        </div>
    ));

    render = () => (
        <this.ThisComponent />
    );
}