from flask import Flask, jsonify
from flask_cors import CORS
import folium
# map_component/map.py
from flask import Blueprint, jsonify

# Use a different name (e.g., map_bp) to avoid conflict with Python’s built-in map() function.
map_bp = Blueprint("map", __name__)

@map_bp.route("/map", methods=["GET"])
def get_map():
    return jsonify({"message": "Hello from Map Component!"})

map= Flask(__name__)
CORS(map)  # Enable CORS for all routes

@map.route('/api/map', methods=['GET'])
def get_map():
    # Create a map
    m = folium.Map(location=[40.7128, -74.0060], zoom_start=12)

    # Add a marker
    folium.Marker(
        location=[40.7128, -74.0060],
        popup="New York City",
        icon=folium.Icon(color="blue")
    ).add_to(m)

    # Save the map to an HTML string
    map_html = m._repr_html_()

    # Return the map HTML as JSON
    return jsonify({'map_html': map_html})

if __name__ == '__main__':
    map.run(debug=True)
    