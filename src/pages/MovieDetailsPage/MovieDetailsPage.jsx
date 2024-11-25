import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  // приміняємо useParams() щоб витягнути параметри  і зразу деструктуризуємо {movies.id}
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);
  //бовязково слід додати тому що юзефект рендеритьсядвічііпри першому рендері - буде налл
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!movie) {
    return <p>movie not found</p>;
  }
  // console.log(moviesId);
  return (
    <div>
      <div className={s.title}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <ul>
          <li>
            <h2>{movie.title}</h2>
          </li>
          <li></li>
          <li>Overview</li>
          <li>{movie.overview}</li>
          <li>
            <h2>Genres</h2>
          </li>
          <li>
            <ul>
              {movies.map(movie => (
                <li key={movie.id}>
                  {/*робимо посилання на сторінку. обовязково toString(), тя лішки сприймають лише строку movie.id.toString()*/}
                  <Link to={movie.id.toString()}>
                    <p>{movie.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <nav>
        <Link to="cast">MovieCast</Link>
        <Link to="reviews">MovieReviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
