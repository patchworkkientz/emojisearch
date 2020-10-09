import React from 'react';
import classes from './Results.module.css';

export default function Results(props) {

    const color = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"];

    let i = color.length - 1;

    let results = props.current.results.map(val => (

        <li key={val.title}
            className={classes.ListItem}>

            <div className={classes.Symbol}
                 onClick={() => {props.addEmoji(val)}}>{val.symbol}
            </div>

            <div className={classes.Card}>
                <p className={classes.Title}
                   onClick={() => {props.addEmoji(val)}}><strong>{val.title}</strong></p>

                <div>{val.keywords.split(" ").filter((v, i) => val.keywords.split(" ").indexOf(v) === i) // removes duplicate keywords for display

                    .map(val => (

                        <div className={classes.Keywords}
                             style={{backgroundColor:  i === 0 ? color[i=color.length - 1] : color[--i]}}
                             onClick={() => {props.clickKeyword(val)}}
                             key={val.title}
                        >{val}</div>

                    ))}</div>
            </div>
        </li>
    ));

    return (
        <div>
            <ul className={classes.List}>
                {results}
            </ul>
        </div>
    );
}

