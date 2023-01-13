import React from "react";
import styles from "../styles/func-keys.module.scss";
import Key from "./key";
import * as L from "../logics/func-keys";

export default class FuncKeys extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divFuncKeys}>
            <div>
                <div>
                    <Key
                        role="kfuncr1"
                        upperContent={<span role="klg">x!</span>}
                        content={
                            <span role="klb">
                                x<sup>-1</sup>
                            </span>
                        }
                        onClick={() => {
                            L.onR1C1Click();
                        }}
                    />

                    <Key
                        role="kfuncr1"
                        upperContent={<span role="klg">nPr</span>}
                        content={<span role="klb">nCr</span>}
                        onClick={() => {
                            L.onR1C2Click();
                        }}
                    />
                </div>
                <div>
                    <Key
                        role="kfuncr1"
                        upperContent={<span role="klg">{"Rec("}</span>}
                        content={<span role="klb">{"Pol("}</span>}
                        onClick={() => {
                            L.onR1C3Click();
                        }}
                    />

                    <Key
                        role="kfuncr1"
                        upperContent={
                            <span role="klg">
                                <sup>3</sup>√
                            </span>
                        }
                        content={
                            <span role="klb">
                                x<sup>3</sup>
                            </span>
                        }
                        onClick={() => {
                            L.onR1C4Click();
                        }}
                    />
                </div>
            </div>

            <div>
                <Key
                    role="kfunc"
                    content={<span role="klb">d/c</span>}
                    onClick={() => {
                        L.onR2C1Click();
                    }}
                />
                <Key
                    role="kfunc"
                    content={<span role="klb">√</span>}
                    onClick={() => {
                        L.onR2C2Click();
                    }}
                />
                <Key
                    role="kfunc"
                    content={
                        <span role="klb">
                            x<sup>2</sup>
                        </span>
                    }
                    onClick={() => {
                        L.onR2C3Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klg">
                            <sup>x</sup>√
                        </span>
                    }
                    content={<span role="klb">^</span>}
                    onClick={() => {
                        L.onR2C4Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klg">
                            10<sup>x</sup>
                        </span>
                    }
                    content={<span role="klb">log</span>}
                    onClick={() => {
                        L.onR2C5Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                e<sup>x</sup>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span role="klo">e</span>
                        </span>
                    }
                    content={<span role="klb">ln</span>}
                    onClick={() => {
                        L.onR2C6Click();
                    }}
                />
            </div>

            <div>
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klo">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; A
                        </span>
                    }
                    content={<span role="klb">{"( - )"}</span>}
                    onClick={() => {
                        L.onR3C1Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                ←&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span role="klo">B</span>
                        </span>
                    }
                    content={<span role="klb">{"° ′ ″"}</span>}
                    onClick={() => {
                        L.onR3C2Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klo">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; C
                        </span>
                    }
                    content={<span role="klb">hyp</span>}
                    onClick={() => {
                        L.onR3C3Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                sin<sup>-1</sup>{" "}
                            </span>
                            <span role="klo">D</span>
                        </span>
                    }
                    content={<span role="klb">sin</span>}
                    onClick={() => {
                        L.onR3C4Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                cos<sup>-1</sup>{" "}
                            </span>
                            <span role="klo">E</span>
                        </span>
                    }
                    content={<span role="klb">cos</span>}
                    onClick={() => {
                        L.onR3C5Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                tan<sup>-1</sup>{" "}
                            </span>
                            <span role="klo">F</span>
                        </span>
                    }
                    content={<span role="klb">tan</span>}
                    onClick={() => {
                        L.onR3C6Click();
                    }}
                />
            </div>

            <div>
                <Key
                    role="kfunc"
                    upperContent={<span role="klg">STO</span>}
                    content={<span role="klb">RCL</span>}
                    onClick={() => {
                        L.onR4C1Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={<span role="klg">←</span>}
                    content={<span role="klb">ENG</span>}
                    onClick={() => {}}
                />
                <Key
                    role="kfunc"
                    content={<span role="klb">{"("}</span>}
                    onClick={() => {
                        L.onR4C3Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klo">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; X
                        </span>
                    }
                    content={<span role="klb">{")"}</span>}
                    onClick={() => {
                        L.onR4C4Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span role="klo">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Y
                        </span>
                    }
                    content={<span role="klb">,</span>}
                    onClick={() => {
                        L.onR4C5Click();
                    }}
                />
                <Key
                    role="kfunc"
                    upperContent={
                        <span>
                            <span role="klg">
                                M-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span role="klo">M</span>
                        </span>
                    }
                    content={<span role="klb">M+</span>}
                    onClick={() => {
                        L.onR4C6Click();
                    }}
                />
            </div>
        </div>
    );
}
