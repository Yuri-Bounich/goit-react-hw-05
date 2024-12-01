import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ query }) => {
  // Лок1) константа для фіксації локації при вибірці (пошуку) даних
  const location = useLocation();
  // console.log(location);

  return (
    <div>
      <ul className={s.list}>
        {query.map(movie => (
          <li key={movie.id}>
            {/*робимо посилання на сторінку.  обовязково toString(), тя лішки сприймають лише строку movie.id.toString()*/}
            {/*Лок2) вкладаємо стейт з локацією в маршрут і він роутером передається по маршруту*/}
            <Link to={`/movies/${movie.id.toString()}`} state={location}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
