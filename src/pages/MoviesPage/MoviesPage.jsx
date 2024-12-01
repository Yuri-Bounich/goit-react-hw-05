import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSearchByInclude } from '../../services/api';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const handleSubmit = newValue => {
    const { query } = newValue;
    if (query.trim()) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  };

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchByInclude(query);
        setMovies(data.results);
      } catch (error) {
        setError('Failed to fetch movies');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Formik onSubmit={handleSubmit} initialValues={{ query }}>
        <Form className={s.form}>
          <Field name="query" className={s.input} placeholder="Search movie" />
          <button className={s.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      {/* Рендеримо список тільки якщо є пошуковий запит */}
      {query && <MovieList query={movies} />}
    </div>
  );
};

export default MoviesPage;
