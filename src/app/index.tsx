import {Outlet} from 'react-router';

import {Header} from './components/header';

export const App = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);
