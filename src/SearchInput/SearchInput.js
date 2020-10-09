import React, {useEffect, useRef} from 'react';
import classes from './SearchInput.module.css';

export default function SearchInput(props) {

    useEffect( () => {
        if (props.current.initialSearch) {
            props.searchFunction();
        }
    });

    let selection = props.current.selection.map((val, i) => {
        return <div key={val.title}
                    className={classes.Symbol}
                    onClick={() => props.removeEmoji(i)}>{val.symbol}</div>;
    });

    return (
        <header className={classes.Header}>
            <div className={classes.Search}>
                <label>Search</label>
                <input type="text"
                       ref={props.search}
                       onChange={props.searchFunction}
                       className={classes.Input}
                       id="searchInput"
                />
            </div>
            <div className={classes.Selection}>{selection}</div>
        </header>
    );
}

