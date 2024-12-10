import React from "react";
import { Link } from "react-router-dom";
import "../stylings/HomePage.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">Welcome to Quiz Maker</h1>
        <p className="homepage-tagline">
          Create, customize, and take quizzes to challenge your knowledge.
        </p>
      </header>
      <main className="homepage-main">
        <div className="homepage-buttons">
          <Link to="/login" className="homepage-button login-button">
            Login
          </Link>
          <Link to="/session" className="homepage-button start-button">
            Start Creating
          </Link>
        </div>
      </main>
      <footer className="homepage-footer">
        <p>© 2024 Quiz Maker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
