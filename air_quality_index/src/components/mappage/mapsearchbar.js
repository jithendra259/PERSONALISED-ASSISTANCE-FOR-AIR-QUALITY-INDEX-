import React, { useState, useEffect } from 'react';
import './searchbar.css';

const API_TOKEN = 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';

function mapSearchbar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // When the query changes, fetch matching stations and extract unique countries.
  const fetchCountries = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.waqi.info/search/?keyword=${query}&token=${API_TOKEN}`
      );
      const data = await response.json();
      if (data.status === 'ok') {
        const countryMap = {};
        data.data.forEach((item) => {
          // Assume station.name is formatted like "City, Country"
          const parts = item.station.name.split(',');
          if (parts.length > 1) {
            const country = parts[parts.length - 1].trim();
            // Only add one entry per country
            if (!countryMap[country]) {
              countryMap[country] = {
                country,
                // Optionally include one example station’s aqi or uid if needed
                aqi: item.aqi,
                uid: item.uid,
              };
            }
          }
        });
        setCountries(Object.values(countryMap));
      } else {
        setCountries([]);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchCountries(query);
    } else {
      setCountries([]);
    }
  }, [query]);

  const handleSelect = (countryItem) => {
    // Call the parent callback with the selected country name.
    onSelect(countryItem.country);
    setQuery('');
    setCountries([]);
  };

  return (
    <div className="searchbar-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for a country"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button">
          <svg viewBox="0 0 24 24">
            <path d="M21.71 20.29l-3.4-3.39A9 9 0 1 0 18 19.59l3.39 3.4a1 1 0 0 0 1.41-1.41zM10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          </svg>
        </button>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      <div className="search-results-container">
        <ul className="search-results-list">
          {countries.map((item) => (
            <li
              key={item.country}
              className="search-result-item"
              onClick={() => handleSelect(item)}
            >
              {item.country}
              <span className="badge">{item.aqi}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default mapSearchbar;
