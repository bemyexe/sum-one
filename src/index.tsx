import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router';

import {
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
} from './app/pages';
import {ProtectedRoute} from './app/routes';
import {AppLayout} from './app';
import {store} from './store';

import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAllowed={true} redirectPath="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
