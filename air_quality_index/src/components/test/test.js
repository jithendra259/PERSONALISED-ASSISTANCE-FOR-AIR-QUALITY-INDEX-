import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";

function Test() {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState("");

  const fetchAQI = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/aqi/${city}`);
      setAqiData(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching AQI data");
      setAqiData(null);
    }
  };

  return (

    <div className="container">
        <Header />
      <h1>Real-Time AQI Report</h1>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchAQI}>Get AQI</button>

      {error && <p>{error}</p>}

      {aqiData && (
        <div className="aqi-card">
          <h2>{aqiData.city}</h2>
          <p>AQI: {aqiData.aqi}</p>
          <p>Dominant Pollutant: {aqiData.pollutant}</p>
          <p>Last Updated: {aqiData.time}</p>
        </div>
      )}
    </div>
  );
}

export default Test;
