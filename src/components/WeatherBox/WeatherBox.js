import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weatherData, setWeatherData] = useState('London');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
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

   });
  });
  
  return (
    <section>
      <PickCity action={handleCityChange}/>
      <WeatherSummary data={weatherData}/>
      <Loader />
    </section>
  )
};

export default WeatherBox;