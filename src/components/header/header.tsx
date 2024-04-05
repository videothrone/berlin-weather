import './header.scss';
import { berlinIcon } from '../../assets/icons/icons.tsx';

export default function Header() {
  return (
    <header className='header'>
      <div className='header__icon'>{berlinIcon}</div>
      <h1 className='header__headline'>BERLIN WEATHER</h1>
    </header>
  )
}
