// File Name: App.js

import React, { useState } from 'react';
import './App.css';
import TextField from './TextField';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const sanitizeInput = (value) => {
        // 1. Trim leading & trailing spaces automatically
        value = value.trim();

        // 2. Remove any special characters except spaces & letters
        value = value.replace(/[^a-zA-Z\s]/g, '');

        // 3. Enforce character limit of 20
        if (value.length > 20) {
            value = value.substring(0, 20); // Auto-trim to 20 characters
        }

        return value;
    };

    const handleChange = (e) => {
        let value = e.target.value;

        // Sanitize input before processing
        value = sanitizeInput(value);

        // Apply validation rules
        if (value === '') {
            setError('Field is required.');
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            setError('Only alphabetic characters and spaces allowed.');
        } else {
            setError('');
        }

        setInputValue(value);
    };

    return (
        <div className="App">
            <h1>Text Field Value: {inputValue}</h1>
            <TextField value={inputValue} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;





/*
// File Name: App.js

import React, { useState } from 'react';
import './App.css';
import TextField from './TextField';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        // 1. Required Field Validation
        if (value.trim() === '') {
            setError('Field is required.');
        }
        // 2. Cannot Start or End with Space
        else if (/^\s|\s$/.test(value)) {
            setError('Cannot start or end with a space.');
        }
        // 3. Character Limit Validation: 20
        else if (value.length > 20) {
            setError('Maximum 20 characters allowed.');
        }
        // 4. Alphabetic Characters and Spaces Only
        else if (!/^[a-zA-Z\s]+$/.test(value)) {
            setError('Only alphabetic characters and spaces allowed.');
        } else {
            setError('');
        }

        setInputValue(value);
    };

    return (
        <div className="App">
            <h1>Text Field Value: {inputValue}</h1>
            <TextField value={inputValue} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;


// File Name: TextField.js

import React from 'react';

function TextField({ value, onChange }) {
    return (
        <input 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder="Enter text here"
        />
    );
}

export default TextField;

*/