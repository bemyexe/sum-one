import {createAction} from '@reduxjs/toolkit';

import {createAppAsyncThunk} from '../../../shared/lib/create-thunk';
import {User} from '../users/users.slice';

export const login = createAppAsyncThunk(
  'login/loginUser',
  async (loginData: {login: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await fetch('/users.json');
      const users: User[] = await response.json();
      const user = users.find(
        (user) =>
          user.login === loginData.login && user.password === loginData.password
      );

      if (user) {
        return 'true';
      } else {
        throw new Error('Неверный логин или пароль');
      }
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAction('logout');
