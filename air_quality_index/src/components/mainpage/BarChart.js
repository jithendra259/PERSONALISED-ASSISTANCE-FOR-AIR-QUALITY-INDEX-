import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const API_TOKEN = 'c69bd9a20bccfbbe7b4f2e37a17b1a2f2332b423';

const BarChart = ({ location, timeRange, pollutant }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchResponse = await fetch(`https://api.waqi.info/v2/search/?token=${API_TOKEN}&keyword=${location}`);
        const searchData = await searchResponse.json();

        if (searchData.status === "ok" && searchData.data.length > 0) {
          const station = searchData.data[0];
          const stationResponse = await fetch(`https://api.waqi.info/feed/@${station.uid}/?token=${API_TOKEN}`);
          const stationData = await stationResponse.json();

          if (stationData.status === "ok" && stationData.data) {
            const forecast = stationData.data.forecast;
            let data = [];
            let labels = [];

            if (timeRange === "24hr" && forecast.hourly && forecast.hourly[pollutant.toLowerCase()]) {
              const hourlyData = forecast.hourly[pollutant.toLowerCase()];
              const currentHour = new Date().getHours();
              for (let i = 0; i < 24; i++) {
                const hour = (currentHour - i + 24) % 24;
                const hourData = hourlyData.find(item => new Date(item.ts).getHours() === hour);
                data.unshift(hourData ? hourData.v : 0);
                labels.unshift(`${hour}:00`);
              }
            } else if (timeRange === "7 days" && forecast.daily && forecast.daily[pollutant.toLowerCase()]) {
              const dailyData = forecast.daily[pollutant.toLowerCase()];
              data = dailyData.slice(0, 7).map(item => item.avg);
              labels = dailyData.slice(0, 7).map(item => item.day);
            } else if (timeRange === "30 days" && forecast.daily && forecast.daily[pollutant.toLowerCase()]) {
              const dailyData = forecast.daily[pollutant.toLowerCase()];
              data = dailyData.slice(0, 30).map(item => item.avg);
              labels = dailyData.slice(0, 30).map(item => item.day);
            }

            setChartData({
              labels,
              datasets: [
                {
                  label: `${pollutant} over ${timeRange}`,
                  data,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                },
              ],
            });
            setError(null);
          } else {
            setError("Error fetching detailed AQI data.");
          }
        } else {
          setError("Error finding station.");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      }
      setLoading(false);
    };

    fetchData();
  }, [location, timeRange, pollutant]);

  return (
    <div className="barchart me-4" style={{ flex: '1 1 300px', minWidth: '300px', height: '300px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
      )}
    </div>
  );
};

export default BarChart;