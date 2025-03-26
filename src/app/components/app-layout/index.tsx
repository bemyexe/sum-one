import {Outlet} from 'react-router';

import {Header} from '../header';

import './style.scss';

export const AppLayout = () => (
  <div className="app">
    <Header />
    <div className="content">
      <Outlet />
    </div>
  </div>
);
