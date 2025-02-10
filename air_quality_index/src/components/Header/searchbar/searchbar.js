import React, { useState, useEffect } from 'react';
import './searchbar.css';

const API_TOKEN = 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';

function Searchbar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.waqi.info/search/?keyword=${query}&token=${API_TOKEN}`);
      const data = await response.json();
      if (data.status === 'ok') {
        setLocations(data.data);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchLocations(query);
    } else {
      setLocations([]);
    }
  }, [query]);

  const handleSelect = (location) => {
    // Pass an object that includes a label and the station details
    onSelect({
      label: location.station.name,  // use the station name as the label
      data: location.station,        // include the station data if needed
    });
    setQuery('');
    setLocations([]);
  };

  return (
    <div className="searchbar-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for a location"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button">
          <svg viewBox="0 0 24 24">
            <path d="M21.71 20.29l-3.4-3.39A9 9 0 1 0 18 19.59l3.39 3.4a1 1 0 0 0 1.41-1.41zM10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
          </svg>
        </button>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      <div className="search-results-container">
        <ul className="search-results-list">
          {locations.map((location) => (
            <li
              key={location.uid}
              className="search-result-item"
              onClick={() => handleSelect(location)}
            >
              {location.station.name}
              <span className="badge">{location.aqi}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Searchbar;