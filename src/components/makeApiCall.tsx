export const makeApiCall = async (): Promise<{
  nowString: string;
  sunriseString: string;
  sunsetString: string;
  temperatureRounded: number; }> => {
  const openWeatherAPIKey = import.meta.env.VITE_OPEN_WEATHER_API_ID;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&APPID=${openWeatherAPIKey}&units=metric`);
      const data = await response.json();

      const sunriseTime = new Date(data.sys.sunrise * 1000);
      const sunsetTime = new Date(data.sys.sunset * 1000);
      const now = new Date();

      const sunriseString = sunriseTime.toLocaleTimeString();
      const sunsetString = sunsetTime.toLocaleTimeString();
      const nowString = now.toLocaleTimeString();
      const temperatureRounded = Math.round(data.main.temp);

      console.log('MakeAPIcall Runs');

      return {
        nowString,
        sunriseString,
        sunsetString,
        temperatureRounded,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        nowString: '',
        sunriseString: '',
        sunsetString: '',
        temperatureRounded: 0
      };
    };
}
