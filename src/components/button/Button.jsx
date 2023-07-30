import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({loadMore}) => {
  return (
    <button onClick={loadMore} type="button" className={css.button}>
      Load More
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};