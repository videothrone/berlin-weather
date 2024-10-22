export type WeatherData = {
  nowString: string;
  sunriseString: string;
  sunsetString: string;
  temperatureRounded: number;
  weatherIcon: string;
  weatherDescription: string;
  countdown: string;
  chanceOfRain: number;
};

export type WeatherDetailsProps = {
  temperature: number;
  sunrise: string;
  sunset: string;
  weatherIcon: string;
  weatherDescription: string;
  dayOrNight: string;
  remainingDaylight: string;
  chanceOfRain: number;
};

export type isItDayOrNightProps = {
  timeNow: string;
  sunrise: string;
  sunset: string;
};
