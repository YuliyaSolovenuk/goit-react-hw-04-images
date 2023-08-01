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

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onRequestClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageUrl} alt={tags} />
      </div>
    </div>,

    document.getElementById('modal-root')
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onRequestClose();
//     }
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onRequestClose();
//     }
//   };

//   render() {
//     const { largeImageUrl, tags } = this.props;

//     return createPortal(
//       <div className={css.overlay} onClick={this.handleBackdropClick}>
//         <div className={css.modal}>
//           <img src={largeImageUrl} alt={tags} />
//         </div>
//       </div>,

//       document.getElementById('modal-root')
//     );
//   }
// }

Modal.propTypes = {
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
};
