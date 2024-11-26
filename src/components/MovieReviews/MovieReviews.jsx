import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsById } from '../../services/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  // приміняємо useParams() щоб витягнути параметри  і зразу деструктуризуємо {movies.id}
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviewsById(movieId);
        setReviews(data.results || []);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch movie reviews');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);
  //oбовязково слід додати тому що юзефект рендериться двічі і при першому рендері - буде налл
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (reviews.length === 0) {
    return <p>Reviews not found</p>;
  }
  // console.log(moviesId);
  return (
    <div>
      <ul className={s.block}>
        {reviews.map(review => (
          <li className={s.item} key={review.id}>
            <p className={s.title}>Author: {review.author}</p>
            <p className={s.reviews}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
