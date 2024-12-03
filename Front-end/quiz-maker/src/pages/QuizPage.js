import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../stylings/QuizPage.css"; // Import the CSS file

const QuizPage = () => {
  const location = useLocation();

  const rawQuestions = location.state?.questions || ""; // Raw questions string
  const timeLimit = location.state?.timeLimit || 5; // Time limit in minutes
  const questions = parseQuestions(rawQuestions); // Parse the questions

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Time in seconds
  const [quizEnded, setQuizEnded] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle user answer
  const handleAnswer = (selectedChoice) => {
    setUserAnswers((prev) => [...prev, selectedChoice]); // Save selected answer

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
    } else {
      endQuiz([...userAnswers, selectedChoice]); // End quiz if it's the last question
    }
  };

  // Calculate the score and end the quiz
  const endQuiz = (finalAnswers = userAnswers) => {
    setQuizEnded(true);
    calculateScore(finalAnswers);
  };

  // Timer logic
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId); // Stop timer
          endQuiz(); // End quiz when time runs out
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId); // Clean up timer on component unmount
  },);

  const calculateScore = (finalAnswers) => {
    let correctCount = 0;

    finalAnswers.forEach((answer, index) => {
      const correctAnswer = questions[index].correctAnswer
        .replace(/^[a-d]\)\s/, "") // Remove prefix like "b) "
        .trim()
        .toLowerCase(); // Normalize correct answer

      const userAnswer = answer?.trim().toLowerCase(); // Normalize user answer

      if (userAnswer === correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!questions.length) {
    return <p className="error-text">No valid questions available.</p>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Page</h1>
      {quizEnded ? (
        <div className="quiz-results">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Percentage: {((score / questions.length) * 100).toFixed(2)}%</p>
          <h3>Review Your Answers</h3>
          <ul className="review-list">
            {questions.map((q, index) => (
              <li key={index} className="review-item">
                <strong>Question {index + 1}: {q.question}</strong>
                <br />
                Your Answer: {userAnswers[index] || "No answer"}
                <br />
                Correct Answer: {q.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="quiz-content">
          <p className="time-left">Time Remaining: {formatTime(timeLeft)}</p>
          <h2 className="question-title">
            Question {currentQuestionIndex + 1}: {currentQuestion.question}
          </h2>
          <ul className="choices-list">
            {currentQuestion.choices
              .filter((choice) => choice.trim() !== "") // Filter out empty choices
              .map((choice, index) => (
                <li key={index} className="choice-item">
                  <button
                    className="choice-button"
                    onClick={() => handleAnswer(choice)}
                  >
                    {choice}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper function to parse questions
const parseQuestions = (dataString) => {
  if (typeof dataString !== "string") {
    console.error("Invalid dataString format:", dataString); // Debug invalid format
    return [];
  }

  const questions = [];
  const questionBlocks = dataString.split("\n\n"); // Split blocks by two newlines

  questionBlocks.forEach((block) => {
    const questionMatch = block.match(/Question\s\d+:\s(.+?)\n/);
    const choicesMatch = block.match(/Choices:\n((?:[a-d]\)\s.+\n?)+)/); // Match multiple choice lines
    const answerMatch = block.match(/Answer:\s(.+)/);

    if (questionMatch && choicesMatch && answerMatch) {
      const question = questionMatch[1].trim();
      const choices = choicesMatch[1]
        .split("\n") // Split choices by newline
        .map((choice) => choice.replace(/^[a-d]\)\s/, "").trim()) // Remove "a) ", "b) ", etc.
        .filter((choice) => choice.trim() !== ""); // Filter out empty choices
      const correctAnswer = answerMatch[1].trim();
      questions.push({ question, choices, correctAnswer });
    } else {
      console.error("Failed to parse question block:", block); // Debug specific block
    }
  });

  return questions;
};

export default QuizPage;
