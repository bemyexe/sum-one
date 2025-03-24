import {NavLink} from 'react-router';

const NAVIGATION_LINKS = [
  {name: 'Главная', path: '/'},
  {name: 'Логин', path: '/login'},
  {name: 'Регистрация', path: '/registration'},
  {name: 'Профиль', path: '/profile'},
];

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
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
