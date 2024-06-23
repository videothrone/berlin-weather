interface WeatherData {
  nowString: string;
  sunriseString: string;
  sunsetString: string;
  temperatureRounded: number;
  weatherIcon: string;
  weatherDescription: string;
  countdown: string;
  chanceOfRain: number;
}

export const makeApiCall = async (): Promise<WeatherData> => {
  const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_ID;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&appid=${openWeatherAPIKey}&units=metric`);
      const data = await response.json();

      const responseForecast =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Berlin,Germany&units=metric&appid=${openWeatherAPIKey}`);
      const forecast = await responseForecast.json();
      const chanceOfRain = forecast.list[0].pop * 100;

      const sunriseTime = new Date(data.sys.sunrise * 1000);
      const sunsetTime = new Date(data.sys.sunset * 1000);
      const now = new Date();

      // Calculate the difference in milliseconds
      const difference = sunsetTime.getTime() - now.getTime();

      // Calculate the remaining days, hours, minutes, and seconds
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const timeString = [];

      if (hours > 0) {
        timeString.push(`${hours}h`);
      }
      if (minutes > 0) {
        timeString.push(`${minutes}m`);
      }
      timeString.push(`${seconds}s`);

      const countdown = timeString.join(" ✹ ");


      const sunriseString = sunriseTime.toLocaleTimeString();
      const sunsetString = sunsetTime.toLocaleTimeString();
      const nowString = now.toLocaleTimeString();
      const temperatureRounded = Math.round(data.main.temp);
      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      return {
        nowString,
        sunriseString,
        sunsetString,
        temperatureRounded,
        weatherIcon,
        weatherDescription,
        countdown,
        chanceOfRain
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        nowString: '',
        sunriseString: '',
        sunsetString: '',
        temperatureRounded: 0,
        weatherIcon: '',
        weatherDescription: '',
        countdown: '',
        chanceOfRain: 0
      };
    }
}
