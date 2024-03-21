import { useState, useEffect } from 'react';
import './weather.css';

export default function Weather() {
  const [number, setNumber] = useState<number>(0);
  const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_ID;

  useEffect(() => {
    /**
     * Retrieves weather data for Berlin, Germany from the OpenWeatherMap API.
     *
     * @return {Promise<void>} Returns a promise that resolves when the weather data has been fetched and processed.
     */
    async function getWeatherData() {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&APPID=${openWeatherAPIKey}&units=metric`);
        const data = await response.json();
        const roundedTemp = Math.round(data.main.temp);
        setNumber(roundedTemp);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getWeatherData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
      <div className="weather">
        <h1 className='weather__title'>BERLIN TEMPERATURE TODAY:</h1>
        <div className='weather__temperature'>{number}° Celsius</div>
      </div>
  )
}
