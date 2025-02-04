import React, { useState } from "react";
import "../components/styles/dashboard.css";
import crewLogo from "../assets/crew-logo.png"; // Update with correct image path
import pirateIcon from "../assets/pirate-child.png"; // Update with correct image path

function ChildDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [chores, setChores] = useState([
    { id: 1, task: "Take out trash", status: "Pending" },
    { id: 2, task: "Do homework", status: "In Progress" },
  ]);

  return (
    <div className="dashboard-container child-theme">
      <div className="dashboard-header">
        <img src={crewLogo} alt="Crewmates Logo" />
        Crewmates
      </div>
      <div className="dashboard-content">
        <div className="sidebar">
          <h3>Navigation</h3>
          <ul>
            <li>Chores</li>
            <li>Rewards</li>
            <li>Messages</li>
          </ul>
        </div>
        <div className="main-content">
          <h2>Welcome, {storedUser.name}</h2>
          <h3>Your Chores</h3>
          <ul>
            {chores.map((chore) => (
              <li key={chore.id}>
                {chore.task} - {chore.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img src={pirateIcon} alt="Pirate Crewmates Icon" className="pirate-icon" />
    </div>
  );
}

export default ChildDashboard;
