import React from "react";
import classNames from "classnames";
import styles from "../styles/sys-key.module.scss";

interface KeyProps{
    content?: any;
    upperContent?: any;
    onClick: () => void;
}

export default class SysKey extends React.Component<KeyProps>{
    constructor(props: KeyProps) {
        super(props);
    }
    
    render = () => (
        <div className={classNames("d-flex flex-column align-items-center")}>
            <div>
                {this.props.upperContent}
            </div>

            <div role="key" className={classNames(styles.divKey)}
            onClick={()=>this.props.onClick()}>
                {this.props.content}
            </div>
        </div>
    )
}