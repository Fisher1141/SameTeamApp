import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Ensure bcrypt.js is installed
import "../components/styles/signup.css";

const SignUp = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Parent",
  });

  const [errors, setErrors] = useState("");

  // Validate Email
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  // Validate Password Length
  const validatePassword = (password) => password.length >= 6;
  // Sanitize Input
  const sanitizeInput = (input) => input.trim().replace(/<[^>]+>/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    // Sanitize inputs
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    // Validate fields
    if (!cleanName || !validateEmail(cleanEmail) || !validatePassword(cleanPassword)) {
      setErrors("Invalid input. Ensure all fields are correctly filled.");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    if (users.some((user) => user.email === cleanEmail)) {
      setErrors("Email already registered.");
      return;
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    // Save user
    const newUser = { name: cleanName, email: cleanEmail, password: hashedPassword, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! Please sign in.");
    onSignUpSuccess(); // Redirect to Sign-in page
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password (min 6 chars)" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
          <option value="Parent">Parent</option>
          <option value="Child">Child</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
