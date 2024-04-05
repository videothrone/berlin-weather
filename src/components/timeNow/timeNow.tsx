import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './timeNow.scss';

export default function TimeNow({ timeNow }: { timeNow: string }) {
  return (
    <div className='weather__time-now-wrapper'>
      <div className='weather__time-now-icon-wrapper'>
        <FontAwesomeIcon icon={faClock} className='weather__time-now-icon berlin-weather__icon' />
      </div>
      <div className='weather__time-now fanwood-text-regular-italic'>{timeNow}</div>
    </div>
  )
}
