import {createAction} from '@reduxjs/toolkit';

import {createAppAsyncThunk} from '../../../shared/lib/create-thunk';
import {User} from '../users/users.slice';

export const login = createAppAsyncThunk(
  'login/loginUser',
  async (
    {
      users,
      loginData,
    }: {
      users: User[];
      loginData: {login: string; password: string};
    },
    {rejectWithValue}
  ) => {
    const user = users.find(
      (user) =>
        user.login === loginData.login && user.password === loginData.password
    );
    if (user) {
      return 'true';
    } else {
      return rejectWithValue('Неправильный логин или пароль');
    }
  }
);

export const logout = createAction('logout');
