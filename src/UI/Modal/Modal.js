import React from 'react';
import classes from './Modal.module.css';

export default function Modal(props) {

    let selection = props.current.selection.map((val, i) => {
        return <div
            key={val.title}
            className={classes.Symbol}
            onClick={() => {props.removeEmoji(i)}}
        >{val.symbol}</div>;
    });

    return (
        <div>
            <div className={classes.Backdrop} onClick={props.close} hidden={props.current.hideModal}></div>
            <div className={classes.Modal} style={
                {
                transform: props.current.hideModal ? "translateY(-100vh)" : "translateY(0)",
                opacity: props.current.hideModal ? "0" : "1"
                }
            }>{selection}</div>
        </div>
    );
}
