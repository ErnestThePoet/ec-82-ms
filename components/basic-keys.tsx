import React from "react";
import styles from "../styles/basic-keys.module.scss";
import Key from "./key";
import * as L from "../logics/basic-keys";

export default class BasicKeys extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divBasicKeys}>
            <div>
                <Key role="kbasic"
                    content={<span role="klw">7</span>}
                    onClick={() => { L.onR1C1Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">8</span>}
                    onClick={() => { L.onR1C2Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">9</span>}
                    onClick={() => { L.onR1C3Click(); }} />
                <Key role="kbasicy"
                    upperContent={<span role="klg">INS</span>}
                    content={<span role="klgr">DEL</span>}
                    onClick={() => { L.onR1C4Click(); }} />
                <Key role="kbasicy"
                    upperContent={<span role="klg">ABOUT</span>}
                    content={<span role="klgr">AC</span>}
                    onClick={() => { L.onR1C5Click(); }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">4</span>}
                    onClick={() => { L.onR2C1Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">5</span>}
                    onClick={() => { L.onR2C2Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">6</span>}
                    onClick={() => { L.onR2C3Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">×</span>}
                    onClick={() => { L.onR2C4Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">÷</span>}
                    onClick={() => { L.onR2C5Click(); }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">1</span>}
                    onClick={() => { L.onR3C1Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">2</span>}
                    onClick={() => { L.onR3C2Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">D</span>}
                    content={<span role="klw">3</span>}
                    onClick={() => { L.onR3C3Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">R</span>}
                    content={<span role="klw">+</span>}
                    onClick={() => { L.onR3C4Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">G</span>}
                    content={<span role="klw">-</span>}
                    onClick={() => { L.onR3C5Click(); }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">0</span>}
                    onClick={() => { L.onR4C1Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">Ran#</span>}
                    content={<span role="klw">.</span>}
                    onClick={() => { L.onR4C2Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">π</span>}
                    content={<span role="klw">EXP</span>}
                    onClick={() => { L.onR4C3Click(); }} />
                <Key role="kbasic"
                    content={<span role="klw">Ans</span>}
                    onClick={() => { L.onR4C4Click(); }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">%</span>}
                    content={<span role="klw"> = </span>}
                    onClick={() => { L.onR4C5Click(); }} />
            </div>
        </div>
    )
}