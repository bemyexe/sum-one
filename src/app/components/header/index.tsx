import {NavLink, useParams} from 'react-router';

import StorageService from '../../../shared/lib/storage.service';

import './style.scss';

export const Header = () => {
  const {id} = useParams<{id: string}>();
  const userId = StorageService.getUserId();
  console.log(userId);
  const NAVIGATION_LINKS = [
    {name: 'Главная', path: '/'},
    {name: 'Логин', path: '/login'},
    {name: 'Регистрация', path: '/registration'},
    {name: 'Профиль', path: id ? `/profile/${id}` : `/profile/${userId}`},
  ];
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
