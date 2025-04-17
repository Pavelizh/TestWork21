'use client';

import Link from 'next/link';
import { City } from '../../types/store.types';
import Image from 'next/image';

interface FavoriteCityCardProps {
  city: City;
  onRemoveClick: (id: string) => void;
}

const FavoriteCityCard: React.FC<FavoriteCityCardProps> = ({
  city,
  onRemoveClick,
}) => {
  return (
    <div className="card w-75 p-3 mx-auto bg-light">
      <div className="d-flex justify-content-between align-items-center">
        <div
          className="bg-info bg-opacity-25 rounded-3 p-2"
          style={{ width: '40%' }}
        >
          <Link
            href={`/city/${city.id}`}
            className="card-title m-0 text-truncate fs-4 text-decoration-none d-block"
          >
            {city.name}, {city.state && `${city.state},`} {city.country}
          </Link>
        </div>
        {city.weather && (
          <div className="d-flex align-items-center gap-2 w-50">
            <Image
              src={`https://openweathermap.org/img/wn/${city.weather.icon}.png`}
              alt="Weather icon"
              width={60}
              height={60}
              className="w-16 h-16 d-block"
            />
            <div className="d-flex flex-column justify-content-center">
              <p className="card-text m-0 fs-5">
                {city.weather.temperature} °C
              </p>
              <p className="card-text m-0 text-muted fs-6">
                {city.weather.description}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => onRemoveClick(city.id)}
          className="btn btn-danger btn-sm ms-3"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default FavoriteCityCard;
