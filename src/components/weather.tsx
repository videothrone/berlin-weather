import { useState, useEffect } from 'react';
import './weather.scss';

export default function Weather() {
  const [temperature, setTemperature] = useState<number>(0);
  const [sunrise, setSunrise] = useState<string>('');
  const [sunset, setSunset] = useState<string>('');
  const [timeNow, setTimeNow] = useState<string>('');
  const [dayOrNight, setDayOrNight] = useState<string>('');
  const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_ID;
  const html = document.querySelector('html');

  // Update the timeNow state every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nowString = now.toLocaleTimeString();
      setTimeNow(nowString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update the dayOrNight state based on the current time
  useEffect(() => {
    const interval = setInterval(() => {
      const sunriseTime = new Date(sunrise);
      const sunsetTime = new Date(sunset);
      const timeNowTime = new Date(timeNow);

      if (timeNowTime >= sunriseTime && timeNowTime < sunsetTime) {
        setDayOrNight('day');
        html?.classList.remove('night');
        html?.classList.add('day');
      } else {
        setDayOrNight('night');
        html?.classList.remove('day');
        html?.classList.add('night');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        const temperatureRounded = Math.round(data.main.temp);
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunriseString = sunriseTime.toLocaleTimeString();
        const sunsetString = sunsetTime.toLocaleTimeString();
        setSunrise(sunriseString);
        setSunset(sunsetString);

        setTemperature(temperatureRounded);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getWeatherData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
      <div className="weather">
        <h1 className='weather__title'>BERLIN TEMPERATURE TODAY:</h1>
        <div className='weather__temperature'>{temperature}° Celsius</div>
        <div className='weather__sunrise-sunset-container'>
          <div className='weather__sunrise-sunset'>
            <span className='weather__sunrise fanwood-text-regular-italic'>Sunrise:</span> {sunrise} / <span className='weather__sunset fanwood-text-regular-italic'>Sunset:</span> {sunset}
          </div>
          <div className='weather__day-or-night'>
            It is <span className='weather__day-or-night-indicator fanwood-text-regular-italic'>{dayOrNight}</span>
          </div>

        </div>
        <div className='weather__time-now'>{timeNow}</div>
      </div>
  )
}
