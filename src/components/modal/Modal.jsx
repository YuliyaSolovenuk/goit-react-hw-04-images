import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onRequestClose();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onRequestClose();
    }
  };

  render() {
    const { largeImageUrl, tags } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={largeImageUrl} alt={tags} />
        </div>
      </div>,

      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
