import React, { useState } from "react";
import "../components/styles/dashboard.css";
import captainLogo from "../assets/captain-logo.png"; // Update with correct image path
import pirateIcon from "../assets/pirate-parent.png"; // Update with correct image path

function ParentDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [chores, setChores] = useState([
    { id: 1, task: "Take out trash", assignedTo: "Child 1", status: "Pending" },
    { id: 2, task: "Do homework", assignedTo: "Child 2", status: "In Progress" },
  ]);

  return (
    <div className="dashboard-container parent-theme">
      <div className="dashboard-header">
        <img src={captainLogo} alt="Captain Logo" />
        Captain
      </div>
      <div className="dashboard-content">
        <div className="sidebar">
          <h3>Navigation</h3>
          <ul>
            <li>Chores</li>
            <li>Team</li>
            <li>Points</li>
            <li>Messages</li>
          </ul>
        </div>
        <div className="main-content">
          <h2>Welcome, {storedUser.name}</h2>
          <h3>Chores</h3>
          <ul>
            {chores.map((chore) => (
              <li key={chore.id}>
                {chore.task} - {chore.status} (Assigned to: {chore.assignedTo})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img src={pirateIcon} alt="Pirate Captain Icon" className="pirate-icon" />
    </div>
  );
}

export default ParentDashboard;
