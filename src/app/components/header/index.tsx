import {NavLink} from 'react-router';

const NAVIGATION_LINKS = [
  {name: 'Главная', path: '/'},
  {name: 'Логин', path: '/login'},
  {name: 'Регистрация', path: '/registration'},
  {name: 'Профиль', path: '/profile'},
];

import './style.scss';

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="navigation-list">
          {NAVIGATION_LINKS.map((link) => (
            <NavLink to={link.path} key={link.name}>
              {link.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};
