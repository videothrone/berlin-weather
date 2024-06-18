export const isItDayOrNight = (timeNow: string, sunrise: string, sunset: string) => {
  if (timeNow >= sunrise && timeNow < sunset) {
    return 'day';
  } else {
    return 'night';
  }
}

export const switchBackground = (dayOrNight: string) => {
  const html = document.querySelector('html');

  if (dayOrNight === 'day') {
    html?.classList.remove('night');
    html?.classList.add('day');
  } else {
    html?.classList.remove('day');
    html?.classList.add('night');
  }
}

export const getTimeNow = () => {
    const now = new Date();
    const timeNow = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return timeNow;
}
