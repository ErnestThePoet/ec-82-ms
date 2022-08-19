import styles from "../styles/dialog.module.scss";
import Key from "./key";

const Dialog = function (props: {
    title: string,
    yesButton?: boolean,
    cancelButton?: boolean,
    yesContent?: string,
    cancelContent?: string,
    closeDialog: (close: boolean) => void;
    style?: {};
    className?: any;
    children: any;
}) {
    return (
        <div className={styles.divDialogWall}
            onClick={e => { e.stopPropagation(); }}
            style={props.style}>
            <div className={styles.divDialogWrapper}>
                <div
                    className={styles.divDialogTitleBar}>
                    <label className={styles.lblDialogTitle}>{props.title}</label>
                </div>

                <div>
                    <div className={styles.divDialogContentWrapper}>
                        {props.children}
                    </div>

                    {
                        (props.yesButton || props.cancelButton) &&
                        <div className={styles.divYesNoWrapper}>
                            {
                                props.cancelButton &&
                                <Key role="kfunc"
                                    content={props.cancelContent ? props.cancelContent : <span role="klb">取消</span>}
                                    onClick={() => { props.closeDialog(false); }}/>
                            }
                            {
                                props.yesButton &&
                                <Key role="kfunc"
                                    content={props.yesContent ? props.yesContent : <span role="klb">确定</span>}
                                    onClick={() => { props.closeDialog(true); }} />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Dialog;