import { useEffect, useState } from 'react';
import fetchTrendMovie from '../../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
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
  return (
    <div>
      <h2>HomePage</h2>
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
    </div>
  );
};

export default HomePage;
