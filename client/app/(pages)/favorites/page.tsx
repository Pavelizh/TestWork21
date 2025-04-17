'use client';

import React from 'react';
import useStore from '../../store/store';
import FavoriteCityCard from '../../components/favorites/FavoriteCityCard';
import DeleteConfirmationModal from '../../components/favorites/DeleteConfirmationModal';
import Tooltip from '../../components/tooltip/Tooltip';
import { City } from '../../types/store.types';

export default function Favorites() {
  const {
    favorites,
    showModal,
    showSuccessMessage,
    handleRemoveClick,
    confirmRemove,
    setShowModal,
  } = useStore();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Избранные города</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-muted">Нет избранных городов</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {favorites.map((city: City) => (
            <FavoriteCityCard
              key={city.id}
              city={city}
              onRemoveClick={handleRemoveClick}
            />
          ))}
        </div>
      )}
      {showModal && (
        <DeleteConfirmationModal
          onClose={() => setShowModal(false)}
          onConfirm={confirmRemove}
        />
      )}
      {showSuccessMessage && (
        <Tooltip message="Успешно удалено!" type="success" />
      )}
    </div>
  );
}
