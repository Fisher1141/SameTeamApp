import React, { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProfileSetup from "./components/ProfileSetup";
import ParentDashboard from "./components/ParentDashboard";
import ChildDashboard from "./components/ChildDashboard";
import bcrypt from "bcryptjs";

const initializeLocalStorage = async () => {
  if (!localStorage.getItem("users")) {
    // Predefined users (hashed passwords)
    const users = [
      {
        id: 1,
        name: "Parent 1",
        email: "parent1@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "Parent",
        teamId: 101
      },
      {
        id: 2,
        name: "Parent 2",
        email: "parent2@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "Parent",
        teamId: 101
      },
      {
        id: 3,
        name: "Child 1",
        email: "child1@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "Child",
        teamId: 101
      },
      {
        id: 4,
        name: "Child 2",
        email: "child2@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "Child",
        teamId: 101
      }
    ];

    // Predefined team
    const teams = [
      {
        id: 101,
        name: "Fisher Family",
        members: [1, 2, 3, 4] // IDs of users in the team
      }
    ];

    // Save data in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("teams", JSON.stringify(teams));
  }
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
  const [page, setPage] = useState(user ? (user.role === "Parent" ? "parentDashboard" : "childDashboard") : "signin");

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  const handleSignInSuccess = (userData) => {
    setUser(userData);
    setPage(userData.role === "Parent" ? "parentDashboard" : "childDashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setPage("signin");
  };

  return (
    <div>
      {page === "signin" && <SignIn onSignInSuccess={handleSignInSuccess} />}
      {page === "signup" && <SignUp />}
      {page === "profileSetup" && <ProfileSetup />}
      {page === "parentDashboard" && user && <ParentDashboard />}
      {page === "childDashboard" && user && <ChildDashboard />}
    </div>
  );
}

export default App;
