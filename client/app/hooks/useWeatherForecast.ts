import axios from 'axios';
import { useState, useEffect } from 'react';
import { WeatherForecast } from '../types/weather.types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const WEATHER_API_URL = process.env.NEXT_PUBLIC_FORECAST_API_URL;

export const useWeatherForecast = (lat: number | null, lon: number | null) => {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!lat || !lon) return;

        const response = await axios.get<WeatherForecast>(WEATHER_API_URL!, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
            lang: 'ru',
          },
        });

        setWeatherData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        setError('Не удалось загрузить данные о погоде');
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return { weatherData, error };
};
