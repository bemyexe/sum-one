import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router';

import StorageService from '../shared/lib/storage.service';
import {loginSelectors} from '../store/slices/login/login.selectors';

import {AppLayout} from './components/app-layout';
import {
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
} from './pages';
import {ProtectedRoute} from './routes';

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const status = useSelector(loginSelectors.selectLoginStateStatus);
  useEffect(() => {
    const token = StorageService.getToken();
    if (!token) {
      setIsAuth(false);
    } else if (status === 'succeeded' || token) {
      setIsAuth(true);
    }
  }, [status]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="profile/:id"
            element={
              <ProtectedRoute isAllowed={isAuth} redirectPath="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
