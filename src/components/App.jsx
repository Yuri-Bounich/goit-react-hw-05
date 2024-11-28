import { Route, Routes } from 'react-router-dom';
import '../index.css';
import Navigation from './Navigation/Navigation';
// import HomePage from '../pages/HomePage/HomePage';
// import MoviesPage from '../pages/MoviesPage/MoviesPage';
// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
// import MovieCast from './MovieCast/MovieCast';
// import MovieReviews from './MovieReviews/MovieReviews';
import { lazy, Suspense } from 'react';

// оптим1) встановлюємо функ через лейзі щоб встановити приоритети загрузки сторінок
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));

const App = () => {
  return (
    <div>
      <Navigation />
      {/*оптим2) огортаємо Suspense всі завантаж через лейзі додаємо fallback щоб поки вантажиться 
      компонент - реакт сприймав затримку і відображав щось на екрані. також ставимо саспенс в кожному аутлеті*/}
      <Suspense fallback={<h2>Wait a second......</h2>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
