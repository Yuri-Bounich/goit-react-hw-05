import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useState } from 'react';

const MoviesPage = () => {
  const [query, setQuery] = useState('');

  const initialValues = { query: '' };
  const handleSubmit = (values, options) => {
    setQuery(values.query);
    options.resetForm();
  };

  return (
    <div>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
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
