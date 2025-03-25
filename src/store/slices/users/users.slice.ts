import {createSlice} from '@reduxjs/toolkit';

import {fetchUsers} from './users.thunks';

export interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const USERS_SLICE_NAME = 'users';

const INITIAL_USERS_STATE: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

export const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState: INITIAL_USERS_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.users.push(...payload);
      })
      .addCase(fetchUsers.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message ?? 'Something went wrong';
      });
  },
});

export const usersReducer = usersSlice.reducer;
