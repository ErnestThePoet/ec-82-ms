import React from "react";
import styles from "../styles/key.module.scss";

interface KeyProps{
    role: "ksys"|"kfunc"|"kbasic"|"kbasicy";
    content?: any;
    upperContent?: any;
    onClick: () => void;
}

export default class Key extends React.Component<KeyProps>{
    constructor(props: KeyProps) {
        super(props);
    }
    
    render = () => (
        <div role="kw" className={styles.divKeyWrapper}
            onClick={() => this.props.onClick()}>
            <div>
                {this.props.upperContent}
            </div>

            <div role={this.props.role}>
                {this.props.content}
            </div>
        </div>
    )
}