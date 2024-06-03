import { useState } from "react";
import "./styles/WeatherCard.css";

/* eslint-disable react/prop-types */
const WeatherCard = ({ weather, temp }) => {
  const [typetemp, setTypetemp] = useState();

  const changeTemperature = () => {
    setTypetemp(!typetemp);
  };
  return (
    <div className="container">
        <button onClick={changeTemperature}>
          Change to {typetemp ? "°F" : "°C"}
        </button>
      <div className="weather-info">
        <h2 className="current-location">
          {weather?.name}, {weather?.sys.country}
        </h2>
        <h2 className="weather-temp">
          {typetemp ? `${temp?.celsius}°C` : `${temp?.farenheit}°F`}
        </h2>
      </div>
      <section className="weather-sect">
        <div className="weather-image">
          <img
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
            }
            alt=""
          />
        </div>
        <article className="current-weather">
          <h3 className="weather-desc">{weather?.weather[0].description}</h3>
          <h1 className="weather-today">Weather Today</h1>
          <ul className="weather-details">
            <li className="weather-detail">
              <span>Wind Speed</span>: {weather?.wind.speed}m/s
            </li>
            <li className="weather-detail">
              <span>Clouds</span>: {weather?.clouds.all}%
            </li>
            <li className="weather-detail">
              <span>Pressure</span>: {weather?.main.pressure}hPa
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};

export default WeatherCard;
