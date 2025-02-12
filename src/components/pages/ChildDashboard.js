// File Name: ChildDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserPoints, updateUserPoints, getChores } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function ChildDashboard() {
    const [chores, setChores] = useState([]);
    const [points, setPoints] = useState(0);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setPoints(getUserPoints(currentUser.username));

            const storedChores = getChores();
            const userChores = storedChores.filter(chore => chore.assignedTo === currentUser.username);
            setChores(userChores);
        }
    }, [currentUser]);

    const toggleChoreCompletion = (choreId) => {
        const updatedChores = chores.map(chore => {
            if (chore.id === choreId) {
                const updatedChore = { ...chore, completed: !chore.completed };

                // Use the chore's specific points value
                const newPoints = updatedChore.completed 
                    ? points + (chore.points || 0)  // Add the specific chore points
                    : Math.max(points - (chore.points || 0), 0); // Subtract on undo

                setPoints(newPoints);
                updateUserPoints(currentUser.username, newPoints);

                return updatedChore;
            }
            return chore;
        });

        setChores(updatedChores);
        localStorage.setItem("chores", JSON.stringify(updatedChores));
    };

    return (
        <div className="dashboard-container">
            <h2>Child Dashboard</h2>
            <p>Welcome, {currentUser ? currentUser.username : "Child"}! View your assigned chores below.</p>
            <p><strong>Your Points:</strong> {points}</p>
            <progress value={points} max="100"></progress>

            <button className="button" onClick={() => navigate('/child-rewards')}>
                Go to Rewards
            </button>

            <div>
                <h3>Your Chores</h3>
                <ul>
                    {chores.map(chore => (
                        <li key={chore.id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                            {chore.text} - {chore.completed ? "Completed" : "Pending"} ({chore.points} pts)
                            <button onClick={() => toggleChoreCompletion(chore.id)}>
                                {chore.completed ? "Undo" : "Complete"}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChildDashboard;
