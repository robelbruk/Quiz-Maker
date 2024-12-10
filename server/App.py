from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

# Store the last generated quiz globally (in-memory)
quiz_storage = {
    "questions": None  # Placeholder for the last generated quiz
}

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    try:
        # Retrieve data from the request body
        data = request.json
        document = data.get('document')
        num_questions = data.get('numQuestions')  # Number of questions requested by the user

        # Validate inputs
        if not document:
            return jsonify({"error": "No document provided"}), 400
        if not num_questions or not isinstance(num_questions, int) or num_questions <= 0:
            return jsonify({"error": "Invalid number of questions"}), 400

        # Call OpenAI Chat Completion API to generate quiz questions
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant that generates multiple-choice quizzes. "
                               "The response should follow this format strictly:"
                               "\n\n"
                               "Question [question_number]: [question_text]\n"
                               "Choices:\n"
                               "a) [choice_1]\n"
                               "b) [choice_2]\n"
                               "c) [choice_3]\n"
                               "d) [choice_4]\n"
                               "Answer: [correct_choice_statement]\n"
                               "---\n"
                               "Do not include any additional text outside this format."
                },
                {
                    "role": "user",
                    "content": f"Generate a quiz with {num_questions} multiple-choice questions based on the following text:\n\n{document}\n\n"
                               "Ensure the response follows the specified format strictly."
                }
            ],
            temperature=0.7,
            max_tokens=1500
        )

        # Extract questions and store in global storage
        questions = response.choices[0].message['content']
        quiz_storage["questions"] = questions  # Store quiz globally
        return jsonify({"questions": questions})  # Return the questions
    except Exception as e:
        print("Error generating quiz:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/get-quiz', methods=['GET'])
def get_quiz():
    try:
        # Check if a quiz exists in global storage
        if not quiz_storage["questions"]:
            return jsonify({"error": "No quiz has been generated yet"}), 404

        return jsonify({"questions": quiz_storage["questions"]})
    except Exception as e:
        print("Error retrieving quiz:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
