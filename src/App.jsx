import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('Coimbatore');
  const [error, setError] = useState(null);

  const API_KEY = 'ad68c7fcdabc6891656fa063612b2dba'; // ← Replace with your real key

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    axios.get(url)
      .then(response => {
        setForecast(response.data.list);
        setError(null);
      })
      .catch(err => {
        setError('Failed to fetch forecast data');
        setForecast([]);
      });
  }, [city]);

  // Filter one forecast per day (e.g., at 12:00 PM)
  const dailyForecast = forecast.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🌤️ 5-Day Forecast</h2>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city"
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        {dailyForecast.map((day, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", minWidth: "150px" }}>
            <p><strong>{new Date(day.dt_txt).toLocaleDateString()}</strong></p>
            <p>{day.weather[0].description}</p>
            <p>🌡️ {day.main.temp} °C</p>
            <p>💨 {day.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
