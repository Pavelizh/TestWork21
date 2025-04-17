'use client';

import React from 'react';
import { City } from '../../types/store.types';

interface CityInfoProps {
  city: City;
}

const CityInfo: React.FC<CityInfoProps> = ({ city }) => {
  return (
    <div className="card mb-3 bg-light">
      <div className="card-body">
        <h5 className="card-title text-center">
          {city.name}, {city.state && `${city.state},`} {city.country}
        </h5>
        <p className="card-text text-center text-muted">
          Республика/Регион: {city.country}
        </p>
      </div>
    </div>
  );
};

export default CityInfo;
