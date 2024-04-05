import Header from './components/header/header.tsx';
import Weather from './components/weather/weather.tsx';

export default function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Weather />
      </main>
    </>
  )
}
