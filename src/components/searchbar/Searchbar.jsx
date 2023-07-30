import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    if (!this.state.query.trim()) {
      toast.warning('Enter a search query!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    e.target.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmitSearch}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>
              <FaSearch />
              &nbsp;Search
            </span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
