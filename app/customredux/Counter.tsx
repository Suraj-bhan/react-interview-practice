"use client"
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreContext'

const Counter = () => {
    const store = useContext(StoreContext);
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });

        return unsubscribe;
    }, [store]);

    return (
        <div >
            <div>{state.count}</div>
            <button onClick={() => store.dispatch({ type: "INC" })}>+</button>
            <button onClick={() => store.dispatch({ type: "DEC" })}>-</button>
        </div>
    )
}

export default Counter