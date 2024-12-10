import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylings/SessionPage.css"; // Import the CSS file

const SessionPage = () => {
  const [pdfText, setPdfText] = useState(""); // Extracted PDF text
  const [userText, setUserText] = useState(""); // User-written text
  const [document, setDocument] = useState(""); // Combined text for processing
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const navigate = useNavigate(); // For navigation

  // Read text from the uploaded PDF file
  const readPdfText = async (file) => {
    try {
      setLoading(true);
      setError("");

      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Load the PDF document using ArrayBuffer
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) {
        throw new Error("PDF.js library not loaded");
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      // Extract text from all pages
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += `Page ${i}:\n${pageText}\n\n`;
      }

      setPdfText(fullText);
      setDocument(fullText); // Use the PDF text for processing
    } catch (err) {
      console.error("Error reading PDF file:", err);
      setError(`Error reading PDF file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input for PDF upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file");
      return;
    }

    // Check file size (optional, set to 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Please select a PDF under 10MB.");
      return;
    }

    await readPdfText(file);
  };

  // Handle text area input
  const handleTextInput = (event) => {
    setUserText(event.target.value);
    setDocument(event.target.value); // Use the user-written text for processing
  };

  // Generate quiz based on the document text
  const handleGenerateQuiz = async () => {
    if (!document.trim()) {
      alert("Please enter text or upload a PDF.");
      return;
    }

    // Prompt the user for the time limit and number of questions
    const timer = prompt("Enter the time limit for the quiz (in minutes):", "5");
    const numQuestions = prompt("Enter the number of questions for the quiz:", "5");

    // Validate the inputs
    const timeLimit = parseInt(timer, 10);
    const questionCount = parseInt(numQuestions, 10);

    if (isNaN(timeLimit) || timeLimit <= 0) {
      alert("Please enter a valid positive number for the time limit.");
      return;
    }

    if (isNaN(questionCount) || questionCount <= 0) {
      alert("Please enter a valid positive number for the number of questions.");
      return;
    }

    setLoading(true); // Start loading spinner for quiz generation
    try {
      // Send POST request to generate the quiz
      const response = await axios.post("http://127.0.0.1:5000/generate-quiz", {
        document,
        numQuestions: questionCount, // Pass number of questions
      });

      const rawQuestions = response.data.questions; // The raw questions string from the backend
      navigate("/quiz", { state: { questions: rawQuestions, timeLimit } }); // Navigate to QuizPage with questions and time limit as state
    } catch (error) {
      console.error("Error generating quiz:", error.response?.data || error.message);
      alert("An error occurred while generating the quiz.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    if (!window.pdfjsLib) {
      setError("PDF.js library not loaded. Please include the PDF.js script in your HTML.");
    }
  }, []);

  return (
    <div className="session-container">
      <h1 className="session-title">Quiz Maker - Session Page</h1>

      <div className="input-section">
        <h3 className="section-title">Enter Text Manually:</h3>
        <textarea
          className="textarea"
          rows="7"
          placeholder="Type or paste your text here..."
          value={userText}
          onChange={handleTextInput}
        />
      </div>

      <div className="divider" />

      <div className="input-section">
        <h3 className="section-title">Or Upload a PDF:</h3>
        <label className="file-upload">
          <input
            type="file"
            className="file-input"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <span>Click to upload or drag and drop</span>
        </label>
      </div>

      {loading && <p className="loading-text">Processing PDF... Please wait.</p>}
      {error && <p className="error-text">{error}</p>}

      {pdfText && (
        <div className="text-preview">
          <h3 className="section-title">Extracted PDF Text:</h3>
          <textarea
            className="textarea preview-area"
            rows="10"
            value={pdfText}
            onChange={(e) => setDocument(e.target.value)}
          />
        </div>
      )}

      <button
        className="generate-button"
        onClick={handleGenerateQuiz}
        disabled={loading}
      >
        {loading ? "Generating Quiz..." : "Generate Quiz"}
      </button>
    </div>
  );
};

export default SessionPage;
