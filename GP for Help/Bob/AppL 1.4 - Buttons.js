// File Name: App.js

import React, { useState } from 'react';
import './App.css';
import Button from './Button';

function App() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    const handleReset = () => {
    setCount(0);
    };

    return (
        <div className="App">
        <h1>Counter: {count}</h1>
            <Button label="Increment" onClick={handleIncrement} />
            <Button label="Decrement" onClick={handleDecrement} />
            <Button label="Reset" onClick={handleReset} />
        </div>
    );
}
export default App;
