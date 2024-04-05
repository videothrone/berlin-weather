import './weatherDetails.scss';

export default function WeatherDetails({ temperature, sunrise, sunset, dayOrNight }:
  { temperature: number, sunrise: string, sunset: string, dayOrNight: string }) {
  return (
    <>
      <div className='weather-details__temperature'>
        {temperature}° Celsius
      </div>
      <div className='weather-details__sunrise-sunset-container'>
        <div className='weather-details__sunrise-sunset'>
          <span className='weather-details__sunrise fanwood-text-regular-italic'>Sunrise:</span> {sunrise} / <span className='weather-details__sunset fanwood-text-regular-italic'>Sunset:</span> {sunset}
        </div>
        <div className='weather-details__day-or-night'>
          It is <span className='weather-details__day-or-night-indicator fanwood-text-regular-italic'>{dayOrNight}</span>
        </div>
      </div>
    </>
  )
}
