import clsx from 'clsx';
import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';

// конст для стилізаціїї активної лінки
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const NotFoundPage = () => {
  // встановлення тайтл на сторінці
  //   useEffect(() => {
  //     document.title = 'Trable | NotFoundPage';
  //   }, []);
  return (
    <h2>
      Oooops!! <br></br> Page is not found!<br></br>
      <span>
        <Link to="/" className={buildLinkClass}>
          CLICK HERE
        </Link>
      </span>
      <br></br>
      to return to the mail page
    </h2>
  );
};

export default NotFoundPage;
