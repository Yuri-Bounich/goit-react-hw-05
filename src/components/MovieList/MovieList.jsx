import { useEffect, useState } from 'react';
import fetchTrendMovie from '../../services/api';
import { Link } from 'react-router-dom';
import s from './MovieList.module.css';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendMovie();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const filteredData = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSetQuery = newValue => {
    setQuery(newValue);
  };

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>
      <MoviesPage onSubmit={handleSetQuery} />
      <ul className={s.list}>
        {filteredData.map(movie => (
          <li key={movie.id}>
            {/*робимо посилання на сторінку. обовязково toString(), тя лішки сприймають лише строку movie.id.toString()*/}
            <Link to={movie.id.toString()}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
