# Quiz-Maker

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

### Frontend
- React.js
- CSS for styling

### Backend
- Flask
- OpenAI API for question generation

### Additional Libraries
- Axios (HTTP requests)
- React Router DOM (routing)
- PDF.js (PDF parsing)

---

## Backend Setup

1. Navigate to the `server/` directory.
2. Set up a Python virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Create a `.env` file and add your OpenAI API key:

    ```
    export OPENAI_API_KEY="your_api_key_here"
    ```

4. Start the Flask server:

    ```bash
    python app.py
    ```

5. The backend will be available at `http://127.0.0.1:5000`.

---
## Demo
<img width="1459" alt="image" src="https://github.com/user-attachments/assets/b25d59e3-17f2-4a48-ba6e-8d6023072f53">
<img width="1429" alt="image" src="https://github.com/user-attachments/assets/121ff94d-b17c-4942-9a72-25852cb7ec06">
<img width="1447" alt="image" src="https://github.com/user-attachments/assets/6cbfb459-2de5-4c75-8045-d5f6e8a902da">
<img width="1048" alt="image" src="https://github.com/user-attachments/assets/dff2e6aa-c6f0-4b04-a36d-8e61859da64f">
<img width="1316" alt="image" src="https://github.com/user-attachments/assets/7a8aea8a-71b0-479b-9c47-90ff12012ffd">







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
