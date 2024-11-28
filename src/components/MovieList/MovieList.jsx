import { useEffect, useState } from 'react';
import { fetchTrendMovie, fetchSearchByInclude } from '../../services/api';
import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Лок1) константа для фіксації локації при вибірці (пошуку) даних
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let data;
        if (query) {
          data = await fetchSearchByInclude(query);
        } else {
          data = await fetchTrendMovie();
        }
        setMovies(data.results);
      } catch (error) {
        setError('Failed to fetch movies');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul className={s.list}>
        {movies.map(movie => (
          <li key={movie.id}>
            {/*робимо посилання на сторінку.  обовязково toString(), тя лішки сприймають лише строку movie.id.toString()*/}
            {/*Лок2) вкладаємо стейт з локацією в маршрут і він роутером передається по маршруту*/}
            <Link to={movie.id.toString()} state={location}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
