import React, { useState, useEffect } from "react";

const NavbarWeather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8dda08a209080b44cdc3566edffcfbc4`
          );
          if (!response.ok) throw new Error("Failed to fetch weather");
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          setError(err.message);
        }
      },
      () => setError("Unable to get location")
    );
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
      {error && <span>{error}</span>}
      {!error && !weather && <span>Loading...</span>}
      {weather && (
        <>
          <span>{weather.name}</span>
          <span>•</span>
          <span>{Math.round(weather.main.temp)}°C</span>
          {/* <span>{weather.weather[0].icon && <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
            alt={weather.weather[0].description} 
            style={{ width: "60px" }}
          />}</span> */}
        </>
      )}
    </div>
  );
};

export default NavbarWeather;
