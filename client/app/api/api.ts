import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { GeoCity, WeatherResponse } from '../types/api.types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const GEO_API_URL = process.env.NEXT_PUBLIC_GEO_API_URL;
const WEATHER_API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

export const searchCities = async (
  query: string
): Promise<Array<GeoCity & { id: string }>> => {
  try {
    const response = await axios.get<Array<GeoCity>>(GEO_API_URL!, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });

    return response.data.map((city) => ({
      ...city,
      id: uuidv4(),
    }));
  } catch (error) {
    console.error('Ошибка при поиске городов:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(WEATHER_API_URL!, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении погоды:', error);
    throw error;
  }
};
