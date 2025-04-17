'use client';

import Image from 'next/image';
import React from 'react';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

interface CurrentWeatherProps {
  weather: WeatherData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="card mb-3 bg-light px-5">
      <div className="card-body p-2">
        <h6 className="card-title text-center m-0 fs-6">Текущая погода</h6>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            <p className="m-0 fs-5">{weather.main.temp} °C</p>
          </div>
          <div className="d-flex align-items-center">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Погодная иконка"
              width={60}
              height={60}
              className="me-2"
            />
            <p className="m-0 text-muted">{weather.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
