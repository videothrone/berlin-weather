import { useState, useEffect } from 'react';
import Loader from '../loader/loader.tsx';
import WeatherDetails from '../weatherDetails/weatherDetails.tsx';
import TimeNow from '../timeNow/timeNow.tsx';
import { isItDayOrNight, switchBackground } from '../helpers/helperFunctions.tsx';
import { makeApiCall } from '../helpers/makeApiCall.tsx';
import './weather.scss';

export default function Weather() {
  const [temperature, setTemperature] = useState<number>(0);
  const [sunrise, setSunrise] = useState<string>('');
  const [sunset, setSunset] = useState<string>('');
  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [weatherDescription, setWeatherDescription] = useState<string>('');
  const [timeNow, setTimeNow] = useState<string>('');
  const [dayOrNight, setDayOrNight] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [remainingDaylight, setRemainingDaylight] = useState<string>('');

  useEffect(() => {
    makeApiCall().
      then(({ nowString, sunriseString, sunsetString, temperatureRounded, weatherIcon, weatherDescription, countdown }) => {
        const dayOrNight = isItDayOrNight(nowString, sunriseString, sunsetString);

        setTemperature(temperatureRounded);
        setWeatherIcon(weatherIcon);
        setWeatherDescription(weatherDescription);
        setSunrise(sunriseString);
        setSunset(sunsetString);
        setTimeNow(nowString);
        setDayOrNight(dayOrNight);
        switchBackground(dayOrNight);
        setLoader(false);
        setRemainingDaylight(countdown);
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
        <WeatherDetails
          temperature={temperature}
          sunrise={sunrise}
          sunset={sunset}
          weatherIcon={weatherIcon}
          weatherDescription={weatherDescription}
          dayOrNight={dayOrNight}
          remainingDaylight={remainingDaylight}
        />
        <TimeNow
          className='weather__time-now'
          timeNow={timeNow}
        />
      </div>
  )
}
