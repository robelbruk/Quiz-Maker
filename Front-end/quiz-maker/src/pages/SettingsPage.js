import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [quizSettings, setQuizSettings] = useState({
    timeLimit: 5, // Default 5 minutes
    numQuestions: 10, // Default 10 questions
  });

  // Handle quiz settings input
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setQuizSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Save settings and navigate back to SessionPage
  const handleSaveSettings = () => {
    navigate("/", { state: { quizSettings } }); // Pass quizSettings back to SessionPage
  };

  return (
    <div>
      <h1>Quiz Settings</h1>
      <form style={{ marginBottom: "20px" }}>
        <h3>Customize Your Quiz</h3>

        {/* Time Limit Input */}
        <label>
          Time Limit (minutes):
          <input
            type="number"
            name="timeLimit"
            value={quizSettings.timeLimit}
            onChange={handleSettingsChange}
            min="1"
            max="60"
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        {/* Number of Questions Slider */}
        <label>
          Number of Questions:
          <input
            type="range"
            name="numQuestions"
            value={quizSettings.numQuestions}
            onChange={handleSettingsChange}
            min="5"
            max="20"
            step="1"
            style={{ marginLeft: "10px", width: "200px" }}
          />
          <span style={{ marginLeft: "10px" }}>{quizSettings.numQuestions}</span>
        </label>
      </form>

      <button
        onClick={handleSaveSettings}
        style={{ padding: "10px 20px" }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
