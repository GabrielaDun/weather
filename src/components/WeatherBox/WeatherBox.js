import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=76efa90774fe579ae9d46234658f7612&units=metric`)
    .then(res => res.json())
      .then(data => {
        console.log(data, '<-data, city ->', city);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeatherData(weatherData);
        setPending(false);

   });
  });
  
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {weatherData && <WeatherSummary data={weatherData}/>}
      {pending && <Loader />}
    </section>
  )
};

export default WeatherBox;