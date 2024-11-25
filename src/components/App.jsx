import { Route, Routes } from 'react-router-dom';
import '../index.css';
// import { useState, useEffect } from 'react';
// import SearchBar from './SearchBar/SearchBar';
// import fetchArticles from '../services/api';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from './Loader/Loader';
// import ErrorMessage from './ErrorMessage/ErrorMessage';
// import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
// import ImageModal from './ImageModal/ImageModal';
// import toast from 'react-hot-toast';
import Navigation from './Navigation/Navigation';
import HomePage from '../pages/HomePage/HomePage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';

const App = () => {
  return (
    <div>
      <Navigation />
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
    </div>
  );
};

export default App;
