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
                        upperContent={<span role="klg">x!</span>}
                        content={<span role="klb">x<sup>-1</sup></span>}
                        onClick={() => { }} />
                    
                    <Key role="kfunc"
                        upperContent={<span role="klg">nPr</span>}
                        content={<span role="klb">nCr</span>}
                        onClick={() => { }} />
                </div>
                <div>
                    <Key role="kfunc"
                        upperContent={<span role="klg">{ "Pol("}</span>}
                        content={<span role="klb">{"Rec("}</span>}
                        onClick={() => { }} />

                    <Key role="kfunc"
                        upperContent={<span role="klg"><sup>3</sup>√</span>}
                        content={<span role="klb">x<sup>3</sup></span>}
                        onClick={() => { }} />
                </div>
            </div>

            <div className="w-100 d-flex justify-content-evenly align-items-end">
                <Key role="kfunc"
                    content={<span role="klb">d/c</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    content={<span role="klb">√</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    content={<span role="klb">x<sup>2</sup></span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klg"><sup>x</sup>√</span>}
                    content={<span role="klb">^</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klg">10<sup>x</sup></span>}
                    content={<span role="klb">log</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">e<sup>x</sup>{ "  "}</span><span role="klo">e</span></span>}
                    content={<span role="klb">ln</span>}
                    onClick={() => { }} />
            </div>

            <div className="d-flex justify-content-evenly align-items-end">
                <Key role="kfunc"
                    upperContent={<span role="klo">A</span>}
                    content={<span role="klb">{ "( - )"}</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">{"← "}&nbsp;&nbsp;&nbsp;&nbsp;</span><span role="klo">B</span></span>}
                    content={<span role="klb">{"° ′ ″"}</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klo">C</span>}
                    content={<span role="klb">hyp</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">sin<sup>-1</sup>{" " }</span><span role="klo">D</span></span>}
                    content={<span role="klb">sin</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">cos<sup>-1</sup>{" "}</span><span role="klo">E</span></span>}
                    content={<span role="klb">cos</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">tan<sup>-1</sup>{" "}</span><span role="klo">F</span></span>}
                    content={<span role="klb">tan</span>}
                    onClick={() => { }} />
            </div>

            <div className="d-flex justify-content-evenly align-items-end">
                <Key role="kfunc"
                    upperContent={<span role="klg">STO</span>}
                    content={<span role="klb">RCL</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klg">←</span>}
                    content={<span role="klb">ENG</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    content={<span role="klb">{"("}</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klo">X</span>}
                    content={<span role="klb">{")"}</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span role="klo">Y</span>}
                    content={<span role="klb">,</span>}
                    onClick={() => { }} />
                <Key role="kfunc"
                    upperContent={<span><span role="klg">M-{"  "}&nbsp;&nbsp;&nbsp;&nbsp;</span><span role="klo">M</span></span>}
                    content={<span role="klb">M+</span>}
                    onClick={() => { }} />
            </div>
        </div>
    )
}