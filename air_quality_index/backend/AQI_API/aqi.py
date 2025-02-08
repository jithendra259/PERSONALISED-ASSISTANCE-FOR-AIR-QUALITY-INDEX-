import tkinter as tk
from tkinter import messagebox
import requests

def fetch_aqi():
    city = city_entry.get()
    if not city:
        messagebox.showwarning("Input Error", "Please enter a city name.")
        return

    api_token = "c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423"  # Replace with your actual API token
    url = f"http://api.waqi.info/feed/{city}/?token={api_token}"

    try:
        response = requests.get(url)
        data = response.json()

        if data["status"] == "ok":
            aqi = data["data"]["aqi"]
            dominant_pollutant = data["data"]["dominentpol"]
            time = data["data"]["time"]["s"]

            result = f"City: {city}\nAQI: {aqi}\nDominant Pollutant: {dominant_pollutant}\nLast Updated: {time}"
        else:
            result = f"Error: {data.get('data', 'Unable to fetch data.')}"

    except Exception as e:
        result = f"An error occurred: {e}"

    result_label.config(text=result)

# Initialize the main window
root = tk.Tk()
root.title("AQI Fetcher")

# City input
tk.Label(root, text="Enter City Name:").grid(row=0, column=0, padx=10, pady=10)
city_entry = tk.Entry(root)
city_entry.grid(row=0, column=1, padx=10, pady=10)

# Fetch button
fetch_button = tk.Button(root, text="Fetch AQI", command=fetch_aqi)
fetch_button.grid(row=0, column=2, padx=10, pady=10)

# Result display
result_label = tk.Label(root, text="", justify=tk.LEFT)
result_label.grid(row=1, column=0, columnspan=3, padx=10, pady=10)

root.mainloop()
