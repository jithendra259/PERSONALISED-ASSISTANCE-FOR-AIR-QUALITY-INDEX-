// MapPage.js
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mappage.css'; // This includes both your map and search bar CSS
import Header from '../Header/header';


// --- Search Bar Component ---
function MapSearchbar({ onSelect }) {
  const API_TOKEN = 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';
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
      <Header/>
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

// --- Map and Marker Functions ---
let allMarkers = {};

// Simple token function
function token() {
  return 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';
}

// Remove all markers currently on the map.
function removeMarkers(map) {
  Object.values(allMarkers).forEach((marker) => map.removeLayer(marker));
  allMarkers = {};
}

// Dummy function to get additional marker info.
function getMarkerPopup(markerUID) {
  return Promise.resolve(`Additional info for marker ${markerUID}`);
}

// Fetch stations by country and add markers to the map.
function populateMarkersByCountry(map, country) {
  fetch(
    "https://api.waqi.info/search/?keyword=" +
      encodeURIComponent(country) +
      "&token=" +
      token()
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== "ok") {
        throw new Error(data.data || "Error fetching data");
      }
      // Remove any existing markers
      removeMarkers(map);

      // Loop through the stations and add a marker for each.
      data.data.forEach((station) => {
        // We assume station.station.geo is an array [lat, lon].
        const [lat, lon] = station.station.geo;
        const iw = 83, ih = 107;
        const icon = L.icon({
          iconUrl: "https://waqi.info/mapicon/" + station.aqi + ".30.png",
          iconSize: [iw / 2, ih / 2],
          iconAnchor: [iw / 4, ih / 2 - 5],
        });
        const marker = L.marker([lat, lon], {
          zIndexOffset: station.aqi,
          title: station.station.name,
          icon: icon,
        }).addTo(map);

        // When the marker is clicked, show a popup with basic info.
        marker.on("click", () => {
          const popup = L.popup()
            .setLatLng([lat, lon])
            .setContent(station.station.name)
            .openOn(map);
          getMarkerPopup(station.uid).then((info) => {
            popup.setContent(info);
          });
        });

        // Save the marker by its UID.
        allMarkers[station.uid] = marker;
      });

      // Fit map bounds to include all markers.
      const markerBounds = data.data.map((station) => {
        const [lat, lon] = station.station.geo;
        return new L.LatLng(lat, lon);
      });
      if (markerBounds.length > 0) {
        const bounds = L.latLngBounds(markerBounds);
        map.fitBounds(bounds, { maxZoom: 12, paddingTopLeft: [0, 40] });
      }
    })
    .catch((e) => {
      const errorEl = document.getElementById("leaflet-map-error");
      if (errorEl) {
        errorEl.innerHTML = "Sorry, " + e;
        errorEl.style.display = "";
      } else {
        console.warn("Error element not found:", e);
      }
    });
}

// --- Main Map Page Component ---
const MapPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the Leaflet map in the container.
    mapRef.current = L.map(mapContainerRef.current, {
      attributionControl: false,
      zoomSnap: 0.1,
      center: [20, 0],
      zoom: 2,
    });

    // Add OpenStreetMap tile layer.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Load default markers for a default country (e.g., "India").
    populateMarkersByCountry(mapRef.current, "India");

    // Clean up on component unmount.
    return () => {
      mapRef.current.remove();
    };
  }, []);

  // This handler is passed to the search bar.
  const handleCountrySelect = (country) => {
    if (mapRef.current) {
      populateMarkersByCountry(mapRef.current, country);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Render the search bar above the map */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <MapSearchbar onSelect={handleCountrySelect} />
      </div>
      {/* Error display for map-related issues */}
      <div
        id="leaflet-map-error"
        style={{
          color: "red",
          padding: "5px",
          position: "absolute",
          top: 70,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      ></div>
      {/* The map container */}
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default MapPage;
