import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SessionPage from "./pages/SessionPage";
import QuizPage from "./pages/QuizPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication status to true
  };

  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/session" element={isAuthenticated ? <SessionPage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/quiz" element={isAuthenticated ? <QuizPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
