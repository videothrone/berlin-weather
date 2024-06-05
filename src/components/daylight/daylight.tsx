import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './daylight.scss';

export default function Daylight( { className, remainingDaylight }: { className: string, remainingDaylight: string } ) {
  return (
    <div className={`weather__daylight ${className}`}>
      <div className='weather__daylight-icon-wrapper'>
        <FontAwesomeIcon icon={faSun} className='weather__daylight-icon berlin-weather__icon' />
      </div>
      <div className='weather__daylight-text'>
        <h4 className='weather__daylight-text-headline'>Remaining daylight:</h4>
        <span>{remainingDaylight}</span>
      </div>
    </div>
  )
}
