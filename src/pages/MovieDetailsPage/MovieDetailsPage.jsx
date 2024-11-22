import { Link, Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  return (
    <div>
      <p>MovieDetailsPage</p>
      <nav>
        <Link to="cast">MovieCast</Link>
        <Link to="reviews">MovieReviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
