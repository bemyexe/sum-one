import {createSlice} from '@reduxjs/toolkit';

import StorageService from '../../../shared/lib/storage.service';

import {login, logout} from './login.thunk';

const LOGIN_SLICE_NAME = 'login';

export interface LoginState {
  id: string | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const INITIAL_LOGIN_STATE: LoginState = {
  id: null,
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
        state.error = null;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.id = payload.id;
        state.error = null;
        StorageService.setToken(payload.token);
        StorageService.setUserId(payload.id);
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.status = 'failed';
        state.error = payload ?? 'Something went wrong';
      })
      .addCase(logout, () => {
        StorageService.clearToken();
        return INITIAL_LOGIN_STATE;
      });
  },
});

export const loginReducer = loginSlice.reducer;
