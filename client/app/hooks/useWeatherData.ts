import { useEffect, useState } from 'react';
import { getWeatherByCoordinates } from '../api/api';
import { City } from '../types/store.types';

export const useWeatherData = (results: City[]) => {
  const [weatherData, setWeatherData] = useState<City[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (results.length > 0) {
        const updatedResults = await Promise.all(
          results.map(async (city) => {
            try {
              const weatherResponse = await getWeatherByCoordinates(
                city.lat,
                city.lon
              );
              return {
                ...city,
                weather: {
                  temperature: weatherResponse.main.temp,
                  description: weatherResponse.weather[0].description,
                  icon: weatherResponse.weather[0].icon,
                },
              };
            } catch (error) {
              console.error(
                `Ошибка получения погоды для города ${city.name}`,
                error
              );
              return city;
            }
          })
        );
        setWeatherData(updatedResults);
      }
    };

    fetchWeatherData();
  }, [results]);

  return weatherData;
};
