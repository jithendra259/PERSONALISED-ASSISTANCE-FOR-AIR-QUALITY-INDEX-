
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import re

Chatbot = Flask(__name__)  # Initialize Flask app ONCE
CORS(Chatbot)

def clean_output(text):
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    cleaned_text = ansi_escape.sub('', text)
    cleaned_text = cleaned_text.encode('ascii', 'ignore').decode('ascii')
    return cleaned_text.strip()

def run_deepseek(query):
    try:
        command = ["ollama", "run", "deepseek-r1:8b", query]  # Ensure ollama is in your PATH
        shell = os.name == 'nt'
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=shell)

        output = ""
        for line in iter(process.stdout.readline, ''):
            cleaned_line = clean_output(line)
            if cleaned_line:
                output += cleaned_line + "\n"

        process.wait()
        stderr_output = clean_output(process.stderr.read())

        if stderr_output:
            return None, stderr_output
        else:
            return output.strip(), None

    except FileNotFoundError:
        return None, "'ollama' command not found. Please ensure it is installed correctly."
    except Exception as e:
        return None, f"An error occurred: {e}"

@Chatbot.route('/ask', methods=['POST'])
def ask_deepseek():
    data = request.get_json() # Get the JSON data from the request
    query = data.get('query')  # Extract the 'query' from the JSON

    if not query:
        return jsonify({'error': 'Query cannot be empty!'}), 400

    output, error = run_deepseek(query)

    if error:
        return jsonify({'error': error}), 500

    return jsonify({'response': output}), 200

if __name__ == '__main__':
    Chatbot.run(debug=True)

from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

chatbot= FastAPI()

# Load model and tokenizer from Hugging Face
MODEL_NAME = "deepseek-ai/deepseek-coder-6.7b"  # Change if needed
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float16, device_map="auto")

@chatbot.post("/generate/")
async def generate_text(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=100)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response}


