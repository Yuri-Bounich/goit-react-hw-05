import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';

const MoviesPage = ({ onSubmit }) => {
  const initialValues = { query: '' };
  const handleSubmit = (values, options) => {
    onSubmit(values.query);
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
    </div>
  );
};

export default MoviesPage;
