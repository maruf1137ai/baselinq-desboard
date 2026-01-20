import React, { useState, useEffect } from "react";

const NavbarWeather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const [projectLocation, setProjectLocation] = useState(localStorage.getItem("projectLocation"));

  useEffect(() => {
    const handleProjectChange = () => {
      setProjectLocation(localStorage.getItem("projectLocation"));
    };

    window.addEventListener("project-change", handleProjectChange);
    return () => window.removeEventListener("project-change", handleProjectChange);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let url = "";
        if (projectLocation) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(projectLocation)}&units=metric&appid=8dda08a209080b44cdc3566edffcfbc4`;
        } else if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8dda08a209080b44cdc3566edffcfbc4`;
              const response = await fetch(geoUrl);
              if (!response.ok) throw new Error("Failed to fetch weather");
              const data = await response.json();
              setWeather(data);
            },
            () => setError("Unable to get location")
          );
          return; // Exit and wait for geolocation callback
        } else {
          setError("Geolocation not supported and no project location set");
          return;
        }

        if (url) {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch weather");
          const data = await response.json();
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [projectLocation]);

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
