// File Name: ParentDashboard.js

import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUsers, getChores, addChoreToStorage, saveChores, getUserPoints, updateUserPoints } from "../utils/localStorageUtils";
import { useNavigate } from 'react-router-dom';

function ParentDashboard() {
    const [chores, setChores] = useState([]);
    const [newChore, setNewChore] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [chorePoints, setChorePoints] = useState(10);
    const [deductPointsOnReassign, setDeductPointsOnReassign] = useState({});

    const navigate = useNavigate();
    const familyMembers = getUsers().filter(user => user.role === "Child");
    const currentUser = getCurrentUser();

    useEffect(() => {
        setChores(getChores());
    }, []);

    const addChore = () => {
        if (newChore.trim() && assignedTo) {
            const newChoreObj = {
                id: Date.now(),
                text: newChore,
                completed: false,
                points: chorePoints,
                assignedTo
            };

            addChoreToStorage(newChoreObj);
            setChores([...chores, newChoreObj]);
            setNewChore('');
            setChorePoints(10);
            setAssignedTo('');
        }
    };

    const completeChore = (choreId) => {
        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, completed: true } : chore
        );
        setChores(updatedChores);
        saveChores(updatedChores);

        const chore = chores.find(c => c.id === choreId);
        if (chore) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, currentPoints + chore.points);
        }
    };

    const undoCompleteChore = (choreId) => {
        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, completed: false } : chore
        );
        setChores(updatedChores);
        saveChores(updatedChores);

        const chore = chores.find(c => c.id === choreId);
        if (chore) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, Math.max(currentPoints - chore.points, 0));
        }
    };

    const reassignChore = (choreId, newAssignee) => {
        const chore = chores.find(c => c.id === choreId);
        if (!chore) return;

        if (chore.completed && deductPointsOnReassign[choreId]) {
            const currentPoints = getUserPoints(chore.assignedTo);
            updateUserPoints(chore.assignedTo, Math.max(currentPoints - chore.points, 0));
        }

        const updatedChores = chores.map(chore =>
            chore.id === choreId ? { ...chore, assignedTo: newAssignee } : chore
        );

        setChores(updatedChores);
        saveChores(updatedChores);
    };

    return (
        <div>
            <h2>Parent Dashboard</h2>
            <p>Welcome, {currentUser ? currentUser.username : "Parent"}! Manage your family's chores here.</p>
            
            <button onClick={() => navigate('/parent-rewards')} className="button">
                Go to Parent Rewards
            </button>

            <div>
                <h3>Add a Chore</h3>
                <input 
                    type="text" 
                    value={newChore} 
                    onChange={(e) => setNewChore(e.target.value)} 
                    placeholder="Enter a new chore" 
                />
                <input 
                    type="number" 
                    value={chorePoints} 
                    onChange={(e) => setChorePoints(Number(e.target.value))} 
                    placeholder="Points" 
                />
                <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    <option value="">Assign to...</option>
                    {familyMembers.map(member => (
                        <option key={member.username} value={member.username}>{member.username}</option>
                    ))}
                </select>
                <button onClick={addChore}>Add Chore</button>
            </div>

            {/* ✅ Updated Chore List with Reassign, Complete, and Undo buttons */}
            <div>
                <h3>Chore List</h3>
                <ul>
                    {chores.map(chore => (
                        <li key={chore.id}>
                            <span style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
                                {chore.text} (Assigned to: {chore.assignedTo}) - {chore.completed ? "Completed" : "Pending"}
                            </span>

                            {/* ✅ Show Complete Button ONLY if task is pending */}
                            {!chore.completed && (
                                <button onClick={() => completeChore(chore.id)} style={{ textDecoration: "none" }}>
                                    Complete
                                </button>
                            )}

                            {/* ✅ Show Undo Complete Button ONLY if task is completed */}
                            {chore.completed && (
                                <button onClick={() => undoCompleteChore(chore.id)} style={{ textDecoration: "none" }}>
                                    Undo Complete
                                </button>
                            )}

                            {/* ✅ Reassign Dropdown (Now Appears First) */}
                            <select value={chore.assignedTo} onChange={(e) => reassignChore(chore.id, e.target.value)}>
                                {familyMembers.map(member => (
                                    <option key={member.username} value={member.username}>
                                        {member.username}
                                    </option>
                                ))}
                            </select>

                            {/* ✅ Show Checkbox if chore is completed for subtracting points */}
                            {chore.completed && (
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={deductPointsOnReassign[chore.id] || false}
                                        onChange={(e) =>
                                            setDeductPointsOnReassign({
                                                ...deductPointsOnReassign,
                                                [chore.id]: e.target.checked,
                                            })
                                        }
                                    />
                                    Subtract points from previous child
                                </label>
                            )}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ParentDashboard;
