'use client';

import React from 'react';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-3">
          Вы уверены, что хотите удалить город из избранного?
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button onClick={onClose} className="btn btn-secondary">
            Отмена
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Да, удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
