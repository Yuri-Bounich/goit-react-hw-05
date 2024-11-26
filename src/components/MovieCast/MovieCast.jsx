import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCreditsById } from '../../services/api';
import s from './MovieCast.module.css';

const MovieCast = () => {
  // приміняємо useParams() щоб витягнути параметри  і зразу деструктуризуємо {movies.id}
  const { movieId } = useParams();

  const [casts, setCasts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCreditsById(movieId);
        setCasts(data.cast || []);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch movie cast');
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
  if (casts.length === 0) {
    return <p>Actor not found</p>;
  }
  // console.log(moviesId);
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';
  return (
    <div>
      <ul>
        {casts.map(cast => (
          <li key={cast.id} className={s.info}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                  : defaultImg
              }
              alt={cast.name}
              width="200"
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
//https://api.themoviedb.org /3/movie/ {movie_id} /images
