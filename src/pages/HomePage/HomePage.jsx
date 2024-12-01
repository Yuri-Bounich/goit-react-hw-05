import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendMovie } from '../../services/api';

import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTrendMovie();
        setMovies(data.results);
      } catch (error) {
        setError('Failed to fetch movies');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendMovies();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>
      <MovieList query={movies} />
    </div>
  );
};

export default HomePage;
