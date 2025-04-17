'use client';

import React from 'react';

interface TooltipProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

const Tooltip: React.FC<TooltipProps> = ({ message, type }) => {
  const alertClasses = {
    success: 'alert alert-success',
    error: 'alert alert-danger',
    warning: 'alert alert-warning',
  };

  return (
    <div
      className={`position-fixed bottom-0 end-0 m-3 ${alertClasses[type]}`}
      style={{ zIndex: 1000 }}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Tooltip;
