import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/api';

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
      {/* <p>MovieDetailsPage</p> */}
      <p>{movie.title}</p>
      <img src={movie.poster_path} />
      <nav>
        <Link to="cast">MovieCast</Link>
        <Link to="reviews">MovieReviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
