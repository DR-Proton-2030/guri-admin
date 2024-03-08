import React from 'react';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }:any) => {
  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationModal;
