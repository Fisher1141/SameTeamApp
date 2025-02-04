import React, { useState, useEffect } from "react";
import ParentDashboard from "./ParentDashboard";
import ChildDashboard from "./ChildDashboard";
import "../components/styles/signup.css";

function ProfileSetup() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  // If the user is already part of a team, skip profile setup
  const [profileComplete, setProfileComplete] = useState(storedUser?.teamId ? true : false);
  
  useEffect(() => {
    if (storedUser && storedUser.teamId) {
      setProfileComplete(true);
    }
  }, [storedUser]);

  if (profileComplete) {
    return storedUser.role === "Parent" ? <ParentDashboard /> : <ChildDashboard />;
  }

  return (
    <div className="signup-container">
      <h2>Profile Setup</h2>
      <p>You shouldn't see this screen. Something went wrong.</p>
    </div>
  );
}

export default ProfileSetup;
