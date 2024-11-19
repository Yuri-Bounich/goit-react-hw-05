import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
const fetchArticles = async (query, page) => {
  const response = await axios.get(`/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: '1XVhfs4mUzOdwNBmD94EeUhJyEiTHj8y6Dfez-zNpns',
    },
  });
  return response.data;
};
export default fetchArticles;
