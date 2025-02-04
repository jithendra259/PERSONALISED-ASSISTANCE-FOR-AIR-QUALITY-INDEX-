from flask import Flask, jsonify
from flask_cors import CORS
import folium

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/map', methods=['GET'])
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
    app.run(debug=True)