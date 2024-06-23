# Berlin Weather

This is a very early React-based WIP weather dashboard for Berlin using the [Open Weather Map API](https://openweathermap.org/api). The intention is to show the weather data in some visual ways and maybe expand it to a PWA down the line.

## Local setup

- Get a free API-Key from https://openweathermap.org/api
- Clone the repo
- Add a `.env`. The correct format is:
```
VITE_OPEN_WEATHER_API_ID=YourAPIKey
```
- Run `npm i`
- Run `npm start`
- Et voilà

## Live

[berlin-weather.netlify.app](https://berlin-weather.netlify.app/)

## Tech

- Built with Vite / React
- Weather data is pulled from the Open Weather Map API
- Background color animations done with CSS keyframes
- Uses Typescript, but probably in weird / insufficient ways, since I'm a Typescript noob 🙃

## Features

- Pulls weather data onload, displays temperature, chance of rain, sunrise, sundown and the current time
- Checks if it's day or night in Berlin and changes the background color accordingly
- More TBD
