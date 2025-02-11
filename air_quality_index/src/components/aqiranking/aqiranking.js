import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../Header/header";

const API_TOKEN = "c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423";

function getAQIStatus(aqi) {
  const aqiValue = Number(aqi);
  if (aqiValue <= 50) return "Good";
  if (aqiValue <= 100) return "Moderate";
  if (aqiValue <= 150) return "Unhealthy for Sensitive Groups";
  if (aqiValue <= 200) return "Unhealthy";
  if (aqiValue <= 300) return "Very Unhealthy";
  return "Hazardous";
}

function Aqiranking() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchAQIRanking = async () => {
      try {
        const response = await axios.get("https://api.waqi.info/v2/search/", {
          params: {
            token: API_TOKEN,
            keyword: "India", // Filter for Indian cities
            limit: 1000       // Request more entries to ensure we get enough valid data
          },
        });
  
        if (response.data?.data) {
          // Filter valid AQI entries and convert to numbers
          const validEntries = response.data.data.filter(city => 
            !isNaN(city.aqi) && city.aqi !== "-"
          );
  
          // Sort by AQI descending
          const sortedData = validEntries.sort(
            (a, b) => Number(b.aqi) - Number(a.aqi)
          );
  
          // Take top 100 valid entries
          setRankings(sortedData.slice(0, 100));
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Failed to fetch AQI rankings");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAQIRanking();
  }, []);
  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rankings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rankings.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-4">
      <Headers />
      <h3 className="mt-4">AQI Ranking</h3>
      {loading ? (
        <p>Loading AQI rankings...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">City</th>
                <th scope="col">AQI</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((city, index) => (
                <tr key={city.uid || index}>
                  <th scope="row">{indexOfFirstItem + index + 1}</th>
                  <td>{city.station.name}</td>
                  <td>{city.aqi}</td>
                  <td>{getAQIStatus(city.aqi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-muted">
            Showing {indexOfFirstItem + 1} to{" "}
            {indexOfLastItem > rankings.length ? rankings.length : indexOfLastItem}{" "}
            of {rankings.length} entries
          </div>
          <div className="mt-4 d-flex justify-content-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Aqiranking;
