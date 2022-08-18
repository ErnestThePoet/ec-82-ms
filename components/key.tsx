import React from "react";

interface KeyProps{
    role: "ksys"|"kfunc"|"kbasic";
    content?: any;
    upperContent?: any;
    onClick: () => void;
}

export default class Key extends React.Component<KeyProps>{
    constructor(props: KeyProps) {
        super(props);
    }
    
    render = () => (
        <div className={"d-flex flex-column align-items-center"}>
            <div>
                {this.props.upperContent}
            </div>

            <div role={this.props.role}
            onClick={()=>this.props.onClick()}>
                {this.props.content}
            </div>
        </div>
    )
}