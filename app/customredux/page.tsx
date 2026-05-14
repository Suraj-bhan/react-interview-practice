import React from 'react'
import StoreProvider from './StoreContext';
import Counter from './Counter';

const page = () => {
    return (
        <StoreProvider>
            <Counter />
            <Counter />
            <Counter />
        </StoreProvider>
    )
}

export default page