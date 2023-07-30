import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import css from './App.module.css';
import { PixabayAPI } from 'services/PixabayApi';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    arrayImages: [],
    totalPage: 0,
    isLoading: false,
    modalIsOpen: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImageByQuery();
    }
  }

  fetchImageByQuery = async () => {
    try {
      const { query, page } = this.state;
      this.setState({ isLoading: true });

      const { data } = await PixabayAPI(query, page);
      const perPage = 12;

      if (data.hits.length === 0) {
        toast.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      const totalPage = Math.ceil(data.totalHits / perPage);
      if (this.state.page === this.state.totalPage && page !== 1) {
        toast.warning(
          "We're sorry, but you've reached the end of search results!"
        );
      }

      this.setState(prevState => ({
        arrayImages: [...prevState.arrayImages, ...data.hits],
        totalPage,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = query => {
    if (this.state.query === query) {
      toast.warning(
        'Please enter a new keyword to search.The result of this query is displayed.'
      );
      return;
    }

    this.setState({ query, page: 1, arrayImages: [] });
  };

  loadNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { arrayImages, perPage, page, totalPage, isLoading } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}

        {arrayImages.length ? (
          <ImageGallery arrayImages={arrayImages} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Hello :-) Enter a query to search for pictures!
          </p>
        )}

        {arrayImages.length > perPage ||
          (page < totalPage && <Button loadMore={this.loadNextPage} />)}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
