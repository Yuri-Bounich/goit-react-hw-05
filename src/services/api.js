import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchTrendMovie = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      params: {
        language: 'en-US',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchMovieById = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      params: {
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      params: {
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
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      params: {
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

export const fetchSearchByInclude = async query => {
  try {
    const response = await axios.get(`/search/movie`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },

      params: {
        query,
        include_adult: 'false',
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
//https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1

//https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US
