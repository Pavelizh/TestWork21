'use client';

import { useWeatherData } from '../../hooks/useWeatherData';
import { useFavorites } from '../../hooks/useFavorites';
import CityCarousel from './CityCarousel';
import Tooltip from '../tooltip/Tooltip';
import useStore from '../../store/store';
import { City } from '../../types/store.types';

const CitySearch: React.FC = () => {
  const {
    results,
    loading,
    error,
  }: { results: City[]; loading: boolean; error: string | null } = useStore();
  const weatherData = useWeatherData(results);
  const {
    showSuccessMessage,
    showWarningMessage,
    showErrorMessage,
    handleAddToFavorites,
  }: {
    showSuccessMessage: boolean;
    showWarningMessage: boolean;
    showErrorMessage: boolean;
    handleAddToFavorites: (city: City) => void;
  } = useFavorites();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!results.length) return <p>Нет результатов запроса</p>;

  return (
    <div className="w-auto p-3">
      {showSuccessMessage && (
        <Tooltip message="Успешно добавлено в избранное!" type="success" />
      )}
      {showWarningMessage && (
        <Tooltip message="Данный город уже добавлен!" type="warning" />
      )}
      {showErrorMessage && (
        <Tooltip
          message="Нельзя добавить больше 10 городов в избранное!"
          type="error"
        />
      )}
      <CityCarousel
        cities={weatherData}
        onAddToFavorites={handleAddToFavorites}
      />
    </div>
  );
};

export default CitySearch;
