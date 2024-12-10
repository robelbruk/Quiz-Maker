import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between Sign Up and Login
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Check if the user already exists
    const existingUser = JSON.parse(localStorage.getItem("quizAppUser"));
    if (existingUser && existingUser.username === username) {
      alert("Username already exists. Please log in.");
      return;
    }

    // Save new user credentials in localStorage
    localStorage.setItem("quizAppUser", JSON.stringify({ username, password }));

    alert("Sign up successful! You can now log in.");
    setIsSigningUp(false); // Switch to login mode
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Retrieve stored credentials
    const storedUser = JSON.parse(localStorage.getItem("quizAppUser"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (storedUser.username !== username || storedUser.password !== password) {
      alert("Invalid username or password. Please try again.");
      return;
    }

    onLogin(); // Notify parent component of successful login
    navigate("/"); // Redirect to Quiz Maker page
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>{isSigningUp ? "Sign Up" : "Login"}</h1>
      <form
        onSubmit={isSigningUp ? handleSignUp : handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            background: isSigningUp ? "green" : "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isSigningUp ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsSigningUp(!isSigningUp)}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontSize: "14px",
          background: "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Switch to {isSigningUp ? "Login" : "Sign Up"}
      </button>
    </div>
  );
};

export default LoginPage;
