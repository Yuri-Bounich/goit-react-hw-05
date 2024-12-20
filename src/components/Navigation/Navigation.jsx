import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';

// конст для стилізаціїї активної лінки
const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};
//NavLink робить активним посилання в браузері автоматично віщає isActive на активне посилання
const Navigation = () => {
  return (
    <header className={s.block}>
      <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
