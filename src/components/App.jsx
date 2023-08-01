import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Component } from 'react';
import css from './App.module.css';
import { PixabayAPI } from 'services/PixabayApi';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [arrayImages, setArrayImages] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    if (query === '') {
      return
    }
    fetchImageByQuery();
  }, [query, page]);
  
  const fetchImageByQuery = async () => {
    try {
      setIsLoading(true);

      const { data } = await PixabayAPI(query, page);

      if (data.hits.length === 0) {
        toast.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      const totalPage = Math.ceil(data.totalHits / perPage);
      if (page === totalPage && page !== 1) {
        toast.warning(
          "We're sorry, but you've reached the end of search results!"
        );
      }

      setArrayImages(prevArrayImgs =>[...prevArrayImgs, ...data.hits]);
      setTotalPage(totalPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = querySearch => {
    if (query === querySearch) {
      toast.warning(
        'Please enter a new keyword to search.The result of this query is displayed.'
      );
      return;
    }

    setQuery(querySearch);
    setPage(1);
    setArrayImages([]);
  };

  const loadNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };


  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
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

      {arrayImages.length > 0 &&
         page < totalPage  && 
          (<Button loadMore={loadNextPage} />)}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     arrayImages: [],
//     totalPage: 0,
//     isLoading: false,
//     modalIsOpen: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       this.fetchImageByQuery();
//     }
//   }

//   fetchImageByQuery = async () => {
//     try {
//       const { query, page } = this.state;
//       this.setState({ isLoading: true });

//       const { data } = await PixabayAPI(query, page);
//       const perPage = 12;

//       if (data.hits.length === 0) {
//         toast.warning(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//       const totalPage = Math.ceil(data.totalHits / perPage);
//       if (this.state.page === this.state.totalPage && page !== 1) {
//         toast.warning(
//           "We're sorry, but you've reached the end of search results!"
//         );
//       }

//       this.setState(prevState => ({
//         arrayImages: [...prevState.arrayImages, ...data.hits],
//         totalPage,
//       }));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleFormSubmit = query => {
//     if (this.state.query === query) {
//       toast.warning(
//         'Please enter a new keyword to search.The result of this query is displayed.'
//       );
//       return;
//     }

//     this.setState({ query, page: 1, arrayImages: [] });
//   };

//   loadNextPage = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { arrayImages, perPage, page, totalPage, isLoading } = this.state;

//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {isLoading && <Loader />}

//         {arrayImages.length ? (
//           <ImageGallery arrayImages={arrayImages} />
//         ) : (
//           <p
//             style={{
//               padding: 100,
//               textAlign: 'center',
//               fontSize: 30,
//             }}
//           >
//             Hello :-) Enter a query to search for pictures!
//           </p>
//         )}

//         {arrayImages.length > perPage ||
//           (page < totalPage && <Button loadMore={this.loadNextPage} />)}

//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }
