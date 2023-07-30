import PropTypes from 'prop-types';
import { Modal } from 'components/modal/Modal';
import css from './ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
    largeImageURL: '',
  };

  openModal = largeImageURL => {
    this.setState({ modalIsOpen: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props;

    return (
      <>
        <li className={css.galleryItem}>
          <img
            className={css.imageGalleryItem}
            src={webformatURL}
            alt={tags}
            onClick={() => this.openModal(largeImageURL)}
          />
        </li>

        {this.state.modalIsOpen && (
          <Modal
            modalIsOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            largeImageUrl={largeImageURL}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
     largeImageURL: PropTypes.string.isRequired
}