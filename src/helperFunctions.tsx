export const isItDayOrNight = (timeNow: string, sunrise: string, sunset: string) => {
  const html = document.querySelector('html');

  if (timeNow >= sunrise && timeNow < sunset) {
    html?.classList.remove('night');
    html?.classList.add('day');
    return 'day';
  } else {
    html?.classList.remove('day');
    html?.classList.add('night');
    return 'night';
  }
}
