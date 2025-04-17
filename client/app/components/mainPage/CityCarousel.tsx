'use client';

import React from 'react';
import { City } from '../../types/store.types';
import Image from 'next/image';

interface CityCarouselProps {
  cities: City[];
  onAddToFavorites: (city: City) => void;
}

const CityCarousel: React.FC<CityCarouselProps> = ({
  cities,
  onAddToFavorites,
}) => {
  return (
    <div id="cityCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {cities.map((city, index) => (
          <div
            key={city.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="d-flex flex-column align-items-center justify-content-center bg-light rounded p-3 mx-auto slide-container">
              <h5 className="text-center mb-2 text-truncate w-100">
                {city.name}, {city.state && `${city.state},`} {city.country}
              </h5>
              {city.weather && (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <p className="m-0 fs-5">{city.weather.temperature} °C</p>
                  <Image
                    alt="Иконка погоды"
                    src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
                    width={50}
                    height={50}
                    className="w-25 h-25"
                  />
                </div>
              )}
              {city.weather && (
                <p className="text-center text-muted mt-2 mb-0 text-truncate w-100">
                  {city.weather.description}
                </p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToFavorites(city);
                }}
                className="btn btn-info mt-3 w-75"
              >
                Добавить город в избранное
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev d-flex align-items-center justify-content-center bg-info rounded-circle opacity-75 border-0 position-absolute"
        type="button"
        data-bs-target="#cityCarousel"
        data-bs-slide="prev"
        style={{
          width: '30px',
          height: '30px',
          left: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span
          className="carousel-control-prev-icon visually-hidden"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next d-flex align-items-center justify-content-center bg-info rounded-circle opacity-75 border-0 position-absolute"
        type="button"
        data-bs-target="#cityCarousel"
        data-bs-slide="next"
        style={{
          width: '30px',
          height: '30px',
          right: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span
          className="carousel-control-next-icon visually-hidden"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CityCarousel;
