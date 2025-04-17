'use client';

import { useEffect } from 'react';
import { NextPage } from 'next';

const Popover: NextPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
      );
      const popoverList = Array.from(popoverTriggerList).map(
        (popoverTriggerEl) => {
          // @ts-expect-error: window.bootstrap.Popover не определен
          return new window.bootstrap.Popover(popoverTriggerEl, {
            trigger: 'focus',
            html: true,
          });
        }
      );

      return () => {
        popoverList.forEach((popover) => popover.dispose());
      };
    }
  }, []);

  return (
    <div>
      <button
        type="button"
        className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border-0 rounded-2 bg-info mt-4"
        data-bs-toggle="popover"
        data-bs-html="true"
        data-bs-title="Добро пожаловать в приложение WeatherApp!"
        data-bs-content={`Здесь вы можете:<br>
    - 🌍 Найти любой город и узнать текущую погоду.<br>
    - ⭐ Добавить любимые города в избранное для быстрого доступа.<br>
    - 📊 Просматривать детальную информацию о погоде, включая температуру, осадки и прогноз на 5 дней вперёд.<br>`}
      >
        ?
      </button>
    </div>
  );
};

export default Popover;
