'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useStore from '../../store/store';
import Placeholder from './placeholder/Placeholder';
import { City } from '../../types/store.types';
import Image from 'next/image';

const Widget = () => {
  const { favorites }: { favorites: City[] } = useStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const carouselElement = document.getElementById('widgetCarousel');
      if (carouselElement) {
        // @ts-expect-error: window.bootstrap.Widget не определен
        new window.bootstrap.Carousel(carouselElement, {
          interval: 10000,
          ride: 'carousel',
        });
      }
    }
  }, [favorites]);

  if (favorites.length <= 0) {
    return <Placeholder />;
  }

  return (
    <div className="container mt-4">
      <div id="widgetCarousel" className="carousel slide">
        <div className="carousel-inner">
          {favorites.map((city, index) => (
            <div
              key={city.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <Link
                href={`/city/${city.id}`}
                passHref
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card shadow-sm p-3 rounded-3 mx-auto border bg-light w-25">
                  <h5 className="card-title text-center mb-3">{city.name}</h5>
                  {city.weather && (
                    <div className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                        <p className="m-0 fs-4">
                          {city.weather.temperature} °C
                        </p>
                        <Image
                          alt="Иконка погоды"
                          src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="card-text text-muted">
                        {city.weather.description}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
