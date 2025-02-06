# api_proxy/api.py

from flask import Blueprint, request, jsonify
import requests

api = Blueprint("api", __name__)

@api.route("/api/process-input", methods=["POST"])
def process_input():
    """
    Receives a JSON payload with 'input',
    forwards the input to an external API endpoint,
    and returns the response.
    """
    data = request.json
    user_input = data.get("input")
    
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        # Replace the URL with your actual external API endpoint.
        external_url = "https://localhost.3001.com/api/"
        response = requests.post(
            external_url,
            json={"input": user_input},
            headers={"Content-Type": "application/json"}
        )
        
        # Raise an error for non-200 status codes.
        response.raise_for_status()
        external_data = response.json()
        return jsonify(external_data), 200
    except Exception as e:
        print("Error processing input:", e)
        return jsonify({"error": "Internal Server Error"}), 500

@api.route("/api/get-response", methods=["GET"])
def get_response():
    """
    Calls a GET endpoint on an external API,
    retrieves the response, and returns it.
    """
    try:
        # Replace the URL with your actual external API endpoint.
        external_url = "https://yourdomain.com/api/"
        response = requests.get(external_url)
        response.raise_for_status()
        external_data = response.json()
        return jsonify({"result": external_data}), 200
    except Exception as e:
        print("Error fetching response:", e)
        return jsonify({"error": "Internal Server Error"}), 500
