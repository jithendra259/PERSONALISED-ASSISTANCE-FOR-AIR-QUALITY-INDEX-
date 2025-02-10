import requests
import tkinter as tk
from tkinter import messagebox
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt

# Your API token (provided)
API_TOKEN = "c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423"

def fetch_aqi_data(city):
    """
    Fetch data from the AQICN API for the given city.
    This function calls the feed endpoint and then extracts the
    last 24 hourly AQI values from the JSON response.
    """
    url = f"https://api.waqi.info/feed/{city}/?token={API_TOKEN}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ConnectionError("Failed to connect to the API.")
    
    data = response.json()
    if data.get("status") != "ok":
        raise ValueError("API returned an error. Check the city name or token.")
    
    # Try to obtain historical/hourly data.
    # Depending on your API subscription, the JSON response may contain:
    #   - a "history" key with a list of past measurements, or 
    #   - a "forecast" key with an "hourly" sub-key (here using PM2.5 values).
history = data["data"].get("history")
if not history or len(history) == 0:
    # Try using daily forecast data if available (for example, for PM2.5)
    daily_forecast = data["data"].get("forecast", {}).get("daily", {})
    if daily_forecast and "pm25" in daily_forecast:
        history = daily_forecast["pm25"]
if not history or len(history) == 0:
    raise ValueError("No hourly or daily historical data available for this station.")


def plot_data(history):
    """
    Plot a bar graph from the history data.
    Expects history to be a list of dictionaries where each dictionary contains:
       - a time field (e.g., "time" or "hour")
       - an AQI value (e.g., under "aqi" or "value")
    """
    times = []
    aqi_values = []
    
    for entry in history:
        # Extract the AQI value. Adjust key name as necessary.
        if "aqi" in entry:
            aqi_values.append(entry["aqi"])
        elif "value" in entry:
            aqi_values.append(entry["value"])
        else:
            continue  # Skip if no expected AQI value found
        
        # Extract the time label. Adjust key name as necessary.
        if "time" in entry:
            times.append(entry["time"])
        elif "hour" in entry:
            times.append(entry["hour"])
        else:
            times.append("")
    
    # Create a matplotlib figure for the bar graph.
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(times, aqi_values, color='skyblue')
    ax.set_xlabel("Time")
    ax.set_ylabel("AQI")
    ax.set_title("Last 24 Hour AQI Values")
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    return fig

def on_fetch():
    """
    Event handler for the button.
    Fetches data for the entered city, plots the bar graph,
    and embeds it into the GUI.
    """
    city = city_entry.get().strip()
    if not city:
        messagebox.showwarning("Input Error", "Please enter a city name.")
        return

    try:
        history = fetch_aqi_data(city)
        fig = plot_data(history)
    except Exception as e:
        messagebox.showerror("Error", str(e))
        return

    # Clear any previous canvas
    for widget in plot_frame.winfo_children():
        widget.destroy()
        
    # Embed the matplotlib figure in the Tkinter GUI.
    canvas = FigureCanvasTkAgg(fig, master=plot_frame)
    canvas.draw()
    canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

# --- Create the GUI ---
window = tk.Tk()
window.title("AQI Bar Graph Viewer")

# Top frame: City input and button.
input_frame = tk.Frame(window)
input_frame.pack(pady=10)

tk.Label(input_frame, text="Enter City Name:").pack(side=tk.LEFT, padx=5)
city_entry = tk.Entry(input_frame, width=25)
city_entry.pack(side=tk.LEFT, padx=5)

fetch_button = tk.Button(input_frame, text="Fetch and Plot AQI Data", command=on_fetch)
fetch_button.pack(side=tk.LEFT, padx=5)

# Bottom frame: Plot area.
plot_frame = tk.Frame(window)
plot_frame.pack(fill=tk.BOTH, expand=True)

window.mainloop()
