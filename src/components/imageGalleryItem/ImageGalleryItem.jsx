import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, webformatURL, largeImageURL }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = largeImageURL => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <li className={css.galleryItem}>
        <img
          className={css.imageGalleryItem}
          src={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL)}
        />
      </li>

      {modalIsOpen && (
        <Modal
          modalIsOpen={modalIsOpen}
          onRequestClose={closeModal}
          largeImageUrl={largeImageURL}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
