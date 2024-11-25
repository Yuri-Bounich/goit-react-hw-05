import { Field, Form, Formik } from 'formik';
import s from './MoviePage.module.css';

const MoviesPage = () => {
  const handleSubmit = (values, options) => {
    console.log(values);
    options.resetForm();
  };
  const initialValues = { query: '' };

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
