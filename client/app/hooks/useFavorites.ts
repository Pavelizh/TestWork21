import { useState } from 'react';
import useStore from '../store/store';
import { City } from '../types/store.types';

export const useFavorites = () => {
  const { addToFavorites } = useStore();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const handleAddToFavorites = (city: City) => {
    const { favorites } = useStore.getState();

    if (favorites.length >= 10) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }

    if (
      favorites.some(
        (fav) =>
          fav.name === city.name && fav.lat === city.lat && fav.lon === city.lon
      )
    ) {
      setShowWarningMessage(true);
      setTimeout(() => setShowWarningMessage(false), 3000);
      return;
    }

    addToFavorites(city);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return {
    showSuccessMessage,
    showWarningMessage,
    showErrorMessage,
    handleAddToFavorites,
  };
};
