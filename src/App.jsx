import axios from "axios";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css"

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const success = (pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const API_KEY = "c7956d98c2c5b71a99f322ee037c3126";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(0);
          const farenheit = ((celsius * 9) / 5 + 32).toFixed(0);
          setTemp({ celsius, farenheit });
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [coords]);

  return (
    <>
      <div className="app">
        {
          isLoading ? <h1 style={{color: 'white'}}>Loading...</h1> : (
            <WeatherCard weather={weather} temp={temp} />
          )
        }
      </div>
    </>
  );
}

export default App;
