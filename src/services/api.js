import axios from 'axios';
const VITE_API_KEY = '5b9bf63027172f502bbc6def58c1af12';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchTrendMovie = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`, {
      params: {
        api_key: VITE_API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default fetchTrendMovie;

export const fetchMovieById = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}`, {
      params: {
        api_key: VITE_API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCreditsById = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, {
      params: {
        api_key: VITE_API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US

export const fetchReviewsById = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, {
      params: {
        api_key: VITE_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1
