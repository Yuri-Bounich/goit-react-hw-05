import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

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
      {query && <MovieList query={query} />}
    </div>
  );
};

export default MoviesPage;
