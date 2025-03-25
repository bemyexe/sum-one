import {createSlice} from '@reduxjs/toolkit';

import StorageService from '../../../shared/lib/auth-storage.service';

import {login, logout} from './login.thunk';

const LOGIN_SLICE_NAME = 'login';

export interface LoginState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const INITIAL_LOGIN_STATE: LoginState = {
  status: 'idle',
  error: null,
};

export const loginSlice = createSlice({
  name: LOGIN_SLICE_NAME,
  initialState: INITIAL_LOGIN_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        StorageService.setToken(payload);
      })
      .addCase(login.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message ?? 'Something went wrong';
      })
      .addCase(logout, () => {
        StorageService.clearToken();
        return INITIAL_LOGIN_STATE;
      });
  },
});

export const loginReducer = loginSlice.reducer;
