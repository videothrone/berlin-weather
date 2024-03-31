import { useState, useEffect } from 'react';
import Loader from '../loader/loader.tsx';
import { isItDayOrNight, switchBackground } from '../helpers/helperFunctions.tsx';
import { makeApiCall } from '../helpers/makeApiCall.tsx';
import './weather.scss';

export default function Weather() {
  const [temperature, setTemperature] = useState<number>(0);
  const [sunrise, setSunrise] = useState<string>('');
  const [sunset, setSunset] = useState<string>('');
  const [timeNow, setTimeNow] = useState<string>('');
  const [dayOrNight, setDayOrNight] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    makeApiCall().
      then(({ nowString, sunriseString, sunsetString, temperatureRounded }) => {
        const dayOrNight = isItDayOrNight(nowString, sunriseString, sunsetString);

        setTemperature(temperatureRounded);
        setSunrise(sunriseString);
        setSunset(sunsetString);
        setTimeNow(nowString);
        setDayOrNight(dayOrNight);
        switchBackground(dayOrNight);
        setLoader(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // Update the state every second based on the current time, set the day or night indicator
  useEffect(() => {
    const interval = setInterval(() => {
      const dayOrNight = isItDayOrNight(timeNow, sunrise, sunset);
      const now = new Date();
      const nowString = now.toLocaleTimeString();

      setDayOrNight(dayOrNight);
      switchBackground(dayOrNight);
      setTimeNow(nowString);
    }, 1000);
    return () => clearInterval(interval);
  }, [dayOrNight, timeNow, sunrise, sunset]);

  return (
    loader ? <Loader /> :
      <div className="weather">
        <h1 className='weather__title'>BERLIN WEATHER:</h1>
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
