import axios from 'axios';

export function PixabayAPI (query, page) {

  const URL = 'https://pixabay.com/api/';
 const API_KEY = '37047125-896a571f84c209518000927cd';

    return axios.get(
      `${URL}?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
  
}
