from flask import Flask, request, jsonify
from google.generativeai import GoogleGenerativeAI

app = Flask(__name__)

API_KEY = "AIzaSyAVP3w3Z6_58c3PrTgt6fR-3AqEWBbHkgY"  # Replace with your Gemini API key
genAI = GoogleGenerativeAI(API_KEY)
model = genAI.get_generative_model("gemini-1.5-flash")  # or "gemini-1.5-pro"

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400  # Bad Request

        response = model.generate_content(prompt)
        generated_text = response.text

        return jsonify({'response': generated_text})

    except Exception as e:  # Catching a broad exception for demonstration, handle specific exceptions in production
        print(f"Error generating response: {e}")
        return jsonify({'error': 'An error occurred'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Specify the port explicitly
