import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=76efa90774fe579ae9d46234658f7612&units=metric`)
    .then(res => {
      if(res.status === 200) {
        setError(false);
        return res.json()
        .then(data => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          };
          setWeatherData(weatherData);
          setPending(false);
      });
    } else {
      setError(true);
    }

  });
});
  
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {weatherData && <WeatherSummary data={weatherData}/>}
      {pending && !error && <Loader />}
      {error && <ErrorBox >There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;