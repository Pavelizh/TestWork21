'use client';

import Image from 'next/image';
import React from 'react';

interface ForecastData {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

interface DailyForecastProps {
  forecasts: ForecastData[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecasts }) => {
  const dailyForecast = forecasts.reduce(
    (acc: Record<string, ForecastData[]>, forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecast);
      return acc;
    },
    {}
  );

  return (
    <div className="card bg-light">
      <div className="card-body">
        <h5 className="card-title text-center">Прогноз на 5 дней</h5>
        <ul className="list-group list-group-flush px-4">
          {Object.entries(dailyForecast)
            .slice(0, 5)
            .map(([date, forecasts], index) => {
              const avgTemp =
                forecasts.reduce((sum, f) => sum + f.main.temp, 0) /
                forecasts.length;

              return (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="m-0 fw-bold">{date}</p>
                    <p className="m-0 text-muted">
                      {forecasts[0].weather[0].description}
                    </p>
                  </div>
                  <div>
                    <p className="m-0 fs-5">{avgTemp.toFixed(1)} °C</p>
                    <Image
                      src={`https://openweathermap.org/img/wn/${forecasts[0].weather[0].icon}@2x.png`}
                      alt="Погодная иконка"
                      width="40"
                      height="40"
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default DailyForecast;
