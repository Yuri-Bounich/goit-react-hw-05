import s from './HomePage.module.css';

import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  return (
    <div>
      <h2 className={s.title}>Trending today</h2>

      <MovieList />
    </div>
  );
};

export default HomePage;
