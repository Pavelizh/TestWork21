'use client';

import React from 'react';
import { NextPage } from 'next';

const PlaceHolder: NextPage = () => {
  return (
    <div
      className="card shadow-sm p-3 rounded-3 mx-auto"
      style={{ maxWidth: '20%' }}
    >
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-8"></span>
        </h5>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2 placeholder-glow">
          <span className="placeholder col-4"></span>
          <span
            className="placeholder w-25"
            style={{ width: '50px', height: '50px' }}
          ></span>
        </div>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-10"></span>
        </p>
      </div>
    </div>
  );
};

export default PlaceHolder;
