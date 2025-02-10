import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../Header/header';
import './mainpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import PieChart from './PieChart';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_TOKEN = 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';

function getAirQualityDescription(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

// Mapping for chart colors by pollutant
const pollutantColors = {
  aqi: { bg: 'rgba(75,192,192,0.4)', border: 'rgba(75,192,192,1)' },
  pm25: { bg: 'rgba(255,99,132,0.4)', border: 'rgba(255,99,132,1)' },
  pm10: { bg: 'rgba(54,162,235,0.4)', border: 'rgba(54,162,235,1)' },
  co: { bg: 'rgba(255,206,86,0.4)', border: 'rgba(255,206,86,1)' },
  so2: { bg: 'rgba(75,192,192,0.4)', border: 'rgba(75,192,192,1)' },
  no2: { bg: 'rgba(153,102,255,0.4)', border: 'rgba(153,102,255,1)' },
  o3: { bg: 'rgba(255,159,64,0.4)', border: 'rgba(255,159,64,1)' },
};

function Mainpage() {
  // Selected location is updated by the Searchbar (default Mumbai)
  const [selectedLocation, setSelectedLocation] = useState({
    type: 'city',
    label: 'Mumbai',
    data: null,
  });
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stationInfo, setStationInfo] = useState(null); // new state to hold station info
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [historicalTimeRange, setHistoricalTimeRange] = useState(null);
  const [historicalPollutant, setHistoricalPollutant] = useState(null);
  const timeOptions = ["Last 24 Hours", "Last Week", "Last Month"];
const pollutantOptions = ["PM2.5", "PM10", "CO", "SO2", "NO2", "O3"];



  // Use detailed city data if available, else the label’s first part
  const locationQuery = selectedLocation.data?.name || selectedLocation.label || 'Mumbai';

  // Fetch current AQI data from the WAQI API
  const fetchAqi = useCallback(async () => {
    if (!locationQuery) return;
    setLoading(true);
    try {
      console.log(`Fetching AQI data for location: ${locationQuery}`);
      // Use the search API to find the station
      const searchResponse = await fetch(`https://api.waqi.info/v2/search/?token=${API_TOKEN}&keyword=${locationQuery}`);
      const searchData = await searchResponse.json();

      if (searchData.status === "ok" && searchData.data.length > 0) {
        // Use the first result to fetch detailed station info
        const station = searchData.data[0];
        const stationResponse = await fetch(`https://api.waqi.info/feed/@${station.uid}/?token=${API_TOKEN}`);
        const stationData = await stationResponse.json();

        if (stationData.status === "ok" && stationData.data) {
          setAqiData(stationData.data);
          setError(null);
          setStationInfo(station); // Store station info
        } else {
          console.error("Error fetching detailed AQI data:", stationData);
          setError("Error fetching detailed AQI data. Try again.");
          setAqiData(null);
          setStationInfo(null);
        }
      } else {
        console.error("Error finding station:", searchData);
        setError("Error finding station. Try again.");
        setAqiData(null);
        setStationInfo(null);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please check your connection.");
      setAqiData(null);
      setStationInfo(null);
    }
    setLoading(false);
  }, [locationQuery]);

  useEffect(() => {
    fetchAqi();
  }, [fetchAqi]);

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const searchResponse = await fetch(`https://api.waqi.info/v2/search/?token=${API_TOKEN}&keyword=${searchQuery}`);
      const searchData = await searchResponse.json();

      if (searchData.status === "ok" && searchData.data.length > 0) {
        setSearchResults(searchData.data);
        setError(null);
      } else {
        console.error("Error finding locations:", searchData);
        setError("Error finding locations. Try again.");
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please check your connection.");
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Pie chart: use pollutant readings directly from API (fallback to 0 if not available)
  const pieLabels = ["PM2.5", "PM10", "CO", "SO2", "NO2", "O3"];
  const pieDataValues = pieLabels.map(label => {
    const key = label.toLowerCase().replace('.', '');
    return aqiData?.iaqi?.[key]?.v ?? 0;
  });
  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieDataValues,
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffce56',
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Function to colorize AQI value
  function colorize(aqi, specie) {
    specie = specie || "aqi";
    if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
        return aqi;

    var spectrum = [
        { a: 0, b: "#cccccc", f: "#ffffff" },
        { a: 50, b: "#009966", f: "#ffffff" },
        { a: 100, b: "#ffde33", f: "#000000" },
        { a: 150, b: "#ff9933", f: "#000000" },
        { a: 200, b: "#cc0033", f: "#ffffff" },
        { a: 300, b: "#660099", f: "#ffffff" },
        { a: 500, b: "#7e0023", f: "#ffffff" },
    ];

    var i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
        if (aqi == "-" || aqi <= spectrum[i].a) break;
    }
    return {
      backgroundColor: spectrum[i].b,
      color: spectrum[i].f
    };
}

  // Get color for the main AQI card
  const mainAqiColor = aqiData?.aqi !== undefined ? colorize(aqiData.aqi, 'aqi') : {};

  return (
    <div className="container">
      <Header onSelectLocation={setSelectedLocation} />
      <div className="maincontent mt-4">
        {/* Search Bar Section */}

          

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="row mb-4">
            <div className="col">
              <h5>Search Results:</h5>
              <ul className="list-group">
                {searchResults.map((result) => (
                  <li
                    key={result.uid}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => setSelectedLocation({ type: 'city', label: result.station.name, data: result })}
                    style={{ cursor: 'pointer' }}
                  >
                    {result.station.name}
                    <span className="badge bg-primary rounded-pill">{result.aqi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Current AQI Section */}
        <div className="row1">
          <div className="card text-left" style={{ backgroundColor: mainAqiColor.backgroundColor, color: mainAqiColor.color }}>
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Active</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Deactive</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
            </div>
            <div className="card-body text-left">
              <h3 className="card-title" style={{ fontFamily: 'sans-serif' }}>
                Real-time Air Quality Index (AQI)
              </h3>
              <p className="card-text">
                {aqiData?.city?.name || selectedLocation.label}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                {loading ? (
                  <p className="card-text">Loading...</p>
                ) : error ? (
                  <p className="card-text text-danger">{error}</p>
                ) : (
                  <>
                    <p className="card-text">AQI: {aqiData?.aqi ?? "N/A"}</p>
                    <p className="card-text">Air Quality: {getAirQualityDescription(aqiData?.aqi)}</p>
                  </>
                )}
                <button className="btn btn-primary">More Details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Pollutants Section */}
        <div className="row2 d-flex flex-wrap justify-content-center mt-4">
          {[
            { key: 'pm25', label: 'PM2.5' },
            { key: 'pm10', label: 'PM10' },
            { key: 'co', label: 'Carbon Monoxide' },
            { key: 'so2', label: 'Sulfur Dioxide' },
            { key: 'no2', label: 'Nitrogen Dioxide' },
            { key: 'o3', label: 'Ozone' },
          ].map(({ key, label }) => {
            const pollutantColor = aqiData?.iaqi?.[key]?.v !== undefined ? colorize(aqiData.iaqi[key].v, key) : {};
            return (
              <div className="card" key={key} style={{ width: '18rem', margin: '10px', backgroundColor: pollutantColor.backgroundColor, color: pollutantColor.color }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{label}</h5>
                  {/* Display colorized AQI value */}
                  {aqiData?.iaqi?.[key]?.v !== undefined ? <>{aqiData.iaqi[key].v}</> : "Data Not Available"}
                  <div className="mt-auto">
                    <button className="btn btn-primary">More Info</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Data Section */}
        <div className="row3 mt-4 historicaldata">
          <div className="historicalheadersection d-flex justify-content-between" style={{ borderBottom: '1px solid #000', paddingBottom: '10px' }}>
            <div className="headertile">
              <h5>AQI Graph</h5>
              <h2>Historical Data</h2>
              <p>City: {aqiData?.city?.name || selectedLocation.label}</p>
              {/* Always show the current date/time as the latest timestamp */}
              <p>Date: {new Date().toLocaleString()}</p>
            </div>
            <div className="historicalgraphbutton d-flex align-items-center">
              <div className="me-2">
                {timeOptions.map((opt) => (
                  <button key={opt} className="btn btn-primary me-1" onClick={() => setHistoricalTimeRange(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
              <div>
                <select className="form-select" value={historicalPollutant} onChange={(e) => setHistoricalPollutant(e.target.value)}>
                  {pollutantOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="historicalgraphsection mt-3 d-flex flex-wrap">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;