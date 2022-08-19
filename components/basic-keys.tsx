import React from "react";
import styles from "../styles/basic-keys.module.scss";
import Key from "./key";

export default class BasicKeys extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render = () => (
        <div className={styles.divBasicKeys}>
            <div>
                <Key role="kbasic"
                    content={<span role="klw">7</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">8</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">9</span>}
                    onClick={() => { }} />
                <Key role="kbasicy"
                    upperContent={<span role="klg">INS</span>}
                    content={<span role="klgr">DEL</span>}
                    onClick={() => { }} />
                <Key role="kbasicy"
                    upperContent={<span role="klg">ABOUT</span>}
                    content={<span role="klgr">AC</span>}
                    onClick={() => { }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">4</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">5</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">6</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">×</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">÷</span>}
                    onClick={() => { }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">1</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">2</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">3</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">+</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    content={<span role="klw">-</span>}
                    onClick={() => { }} />
            </div>

            <div>
                <Key role="kbasic"
                    content={<span role="klw">0</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">Ran#</span>}
                    content={<span role="klw">.</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">π</span>}
                    content={<span role="klw">EXP</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">DRG▶</span>}
                    content={<span role="klw">Ans</span>}
                    onClick={() => { }} />
                <Key role="kbasic"
                    upperContent={<span role="klg">%</span>}
                    content={<span role="klw"> = </span>}
                    onClick={() => { }} />
            </div>
        </div>
    )
}