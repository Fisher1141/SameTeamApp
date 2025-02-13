// File Name: App.js

// Import the React library to create components
import React from 'react';

// Import the logo image from the local directory
import logo from './logo512.png'; 

// Define the main App component
function App() {
    return (
        // Outer div to wrap the content
        <div>
            {/* Display the logo image with an alt description for accessibility */}
            <img src={logo} alt="Graphic" />
        </div>
    );
}

// Export the App component as the default export
export default App;

