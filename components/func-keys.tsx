import React from "react";
import classNames from "classnames";
import styles from "../styles/func-keys.module.scss";
import Key from "./key";

export default class FuncKeys extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={classNames(styles.divFuncKeys,
            "d-flex flex-column justify-content-between")}>
            <div className="d-flex justify-content-between">
                <div>
                    <Key role="kfunc"
                        content={<span role="klb">x<sup>-1</sup></span>}
                        upperContent={<span role="klg">x!</span>}
                        onClick={() => { }} />
                    
                    <Key role="kfunc"
                        content={<span role="klb">nCr</span>}
                        upperContent={<span role="klg">nPr</span>}
                        onClick={() => { }} />
                </div>
                <div>
                    <Key role="kfunc"
                        content={<span role="klb">x<sup>-1</sup></span>}
                        upperContent={<span role="klg">x!</span>}
                        onClick={() => { }} />

                    <Key role="kfunc"
                        content={<span role="klb">x<sup>-1</sup></span>}
                        upperContent={<span role="klg">x!</span>}
                        onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}