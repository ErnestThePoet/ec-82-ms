import styles from "../styles/dialog.module.scss";

import classNames from "classnames";

const Dialog = function (props: {
    title: string,
    closeButton?: boolean,
    yesButton?: boolean,
    cancelButton?: boolean,
    yesText?: string,
    cancelText?: string,
    closeDialog: (close: boolean) => void;
    style?: {};
    className?: any;
    children: any;
}) {
    return (
        <div className={classNames(styles.divDialogWall,
            "d-flex justify-content-center align-items-center")}
            onClick={e => { e.stopPropagation(); }}
            style={props.style}>
            <div className={classNames(props.className, styles.divDialogWrapper)}>
                <div
                    className={classNames(styles.divDialogTitleBar,
                        "d-flex justify-content-between align-items-center")}>
                    <label className={styles.lblDialogTitle}>{props.title}</label>
                    {
                        props.closeButton &&
                        <i
                            className="fa-solid fa-xmark"
                            style={{ cursor: "pointer" }}
                            onClick={() => { props.closeDialog(false); }}></i>
                    }
                </div>

                <div>
                    <div className={classNames(styles.divDialogContentWrapper)}>
                        {props.children}
                    </div>

                    {
                        (props.yesButton || props.cancelButton) &&
                        <div className={classNames(styles.divYesNoWrapper,
                            "d-flex justify-content-end mt-2")}>
                            {
                                props.cancelButton &&
                                <button type="button"
                                    className={classNames(styles.btnYesNo, "btn btn-light")}
                                    onClick={() => { props.closeDialog(false); }}>
                                    {
                                        props.cancelText ? props.cancelText : "取消"
                                    }
                                </button>
                            }
                            {
                                props.yesButton &&
                                <button type="button"
                                    className={classNames(styles.btnYesNo, "btn btn-info")}
                                    onClick={() => { props.closeDialog(true); }}>
                                    {
                                        props.yesText ? props.yesText : "确定"
                                    }
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Dialog;