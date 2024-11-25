import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
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

  const genres = movie.genres;
  const date = movie.release_date;
  const year = date.split('-')[0];
  return (
    <div>
      <div className={s.title}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <ul className={s.about}>
          <li>
            <h2>{`${movie.title} (${year})`}</h2>
          </li>
          <li>User score: {movie.vote_average * 10}%</li>
          <li>
            <h2>Overview</h2>
          </li>
          <li>{movie.overview}</li>
          <li>
            <h2>Genres</h2>
          </li>
          <li>
            <ul className={s.genres}>
              {genres.map(genre => (
                <li key={genre.id}>
                  {/*робимо посилання на сторінку. обовязково toString(), тя to у Link сприймають лише строку **.id.toString()*/}
                  <Link to={genre.id.toString()}>
                    <p>{genre.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className={s.info}>
        <p>Additional information</p>
        <ul className={s.links}>
          <li>
            <NavLink to="cast">MovieCast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">MovieReviews</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
