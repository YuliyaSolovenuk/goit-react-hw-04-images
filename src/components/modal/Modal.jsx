import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';
//import { Component } from 'react';

export function Modal({ largeImageUrl, tags, onRequestClose }) {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onRequestClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRequestClose]);

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageUrl} alt={tags} />
      </div>
    </div>,

    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
};
