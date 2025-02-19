from flask import Flask, jsonify
from chatbot.chatbot import generate_text  # Import the route function

app = Flask(__name__)

# ... other routes

# Now you can register the chatbot route with the main app:
app.add_url_rule('/generate', 'generate_text', generate_text, methods=['POST'])


if __name__ == '__main__':
    app.run(debug=True)  # or app.run(debug=True, port=5000) if you want to specify the port
