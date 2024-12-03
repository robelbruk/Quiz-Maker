# Quiz-Maker
# Quiz Maker

## Overview
Quiz Maker is a web application designed to generate and host quizzes based on user-provided content. Users can either upload a PDF document or input text manually, and the app will generate a multiple-choice quiz. It also includes a timer and customizable quiz settings.

---

## Features
- **PDF/Text Input:** Upload a PDF or manually input text to generate quizzes.
- **Customizable Quizzes:** Define the number of questions and time limit for the quiz.
- **Real-Time Timer:** The timer ensures the quiz ends when time runs out.
- **Interactive Quiz Interface:** Users answer questions and review their results upon completion.
- **User Authentication:** Sign up and log in to access the application.

---

## Technologies Used
- **Frontend:**
  - React.js
  - CSS for styling
- **Backend:**
  - Flask
  - OpenAI API for question generation
- **Additional Libraries:**
  - Axios (HTTP requests)
  - React Router DOM (routing)
  - PDF.js (PDF parsing)

---

## Project Structure

```plaintext
QuizMaker/
│
├── public/
├── src/
│   ├── pages/
│   │   ├── HomePage.js        # Homepage component
│   │   ├── LoginPage.js       # Login and signup functionality
│   │   ├── SessionPage.js     # Text input/PDF upload and quiz generation
│   │   ├── QuizPage.js        # Quiz interface with timer
│   │   ├── SettingsPage.js    # Custom quiz settings (optional)
│   ├── stylings/
│   │   ├── HomePage.css       # Styling for HomePage
│   │   ├── SessionPage.css    # Styling for SessionPage
│   │   ├── QuizPage.css       # Styling for QuizPage
│   ├── App.js                 # Main application entry point
│   ├── index.js               # React DOM rendering
│
├── backend/
│   ├── app.py                 # Flask backend for question generation
│   ├── requirements.txt       # Backend dependencies
│
├── .env                       # Environment variables for API keys
├── package.json               # Frontend dependencies
├── README.md                  # Project documentation
