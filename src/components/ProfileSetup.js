// File Name: ProfileSetup.js

import React, { useState } from 'react';
// ✅ Import the utility functions from the correct path
import { getCurrentUser } from "./utils/localStorageUtils"; // Removed getTeamName (not in localStorageUtils.js)
import ParentDashboard from './ParentDashboard';
import ChildDashboard from './ChildDashboard';
import "../components/styles/signup.css";

// ✅ Function to retrieve team name from localStorage
const getTeamName = () => localStorage.getItem("teamName") || "";

function ProfileSetup() {
    const [role, setRole] = useState(''); // ✅ State to store selected role
    const [teamName, setTeamName] = useState(getTeamName()); // ✅ Load team name from localStorage
    const [profileComplete, setProfileComplete] = useState(false); // ✅ State to track profile completion
    const currentUser = getCurrentUser(); // ✅ Get logged-in user details

    // ✅ Function to update selected role
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    // ✅ Function to update team name
    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    // ✅ Function to handle profile setup submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'parent' && teamName) {
            setProfileComplete(true);
        } else if (role === 'child') {
            setProfileComplete(true);
        } else {
            alert('Please select a role and provide a team name if you are a parent.');
        }
    };

    // ✅ Redirect user to the correct dashboard after profile setup
    if (profileComplete) {
        return role === 'parent' ? <ParentDashboard /> : <ChildDashboard />;
    }

    return (
        <div>
            <h2>Profile Setup</h2>
            <p>Welcome, {currentUser ? currentUser.username : 'User'}!</p>
            <form onSubmit={handleSubmit}>
                {/* ✅ Role Selection Dropdown */}
                <div>
                    <label>
                        Select Role:
                        <select value={role} onChange={handleRoleChange}>
                            <option value="">Select...</option>
                            <option value="parent">Parent</option>
                            <option value="child">Child</option>
                        </select>
                    </label>
                </div>
                
                {/* ✅ Input for Team Name (Only for Parents) */}
                {role === 'parent' && (
                    <div>
                        <label>
                            Team Name:
                            <input
                                type="text"
                                value={teamName}
                                onChange={handleTeamNameChange}
                                placeholder="Enter your team name"
                            />
                        </label>
                    </div>
                )}
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProfileSetup;
