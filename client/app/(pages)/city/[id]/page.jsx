'use client';

import React from 'react';
import useStore from '../../../store/store';
import { useWeatherForecast } from '../../../hooks/useWeatherForecast';
import CityInfo from '../../../components/cityPage/CityInfo';
import CurrentWeather from '../../../components/cityPage/CurrentWeather';
import DailyForecast from '../../../components/cityPage/DailyForecast';

export default function CityDetails({ params }) {
  const { id } = React.use(params);
  const { getCityById } = useStore();
  const city = getCityById(id);

  if (!city) {
    return <p>Город не найден</p>;
  }

  const { weatherData, error: weatherError } = useWeatherForecast(
    city.lat,
    city.lon
  );

  if (weatherError) {
    return <p>{weatherError}</p>;
  }

  if (!weatherData) {
    return <p>Загрузка...</p>;
  }

  const currentWeather = weatherData.list[0];

  return (
    <div className="container mt-1">
      <CityInfo city={city} />
      <CurrentWeather weather={currentWeather} />
      <DailyForecast forecasts={weatherData.list} />
    </div>
  );
}
