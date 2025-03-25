import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

import {UsersState} from './users-slice';

const selectUsersState: (state: RootState) => UsersState = (state) =>
  state.usersState;

const selectUsersStateUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

const selectUsersStateStatus = createSelector(
  selectUsersState,
  (state) => state.status
);

const selectUsersStateError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const usersSelectors = {
  selectUsersStateUsers,
  selectUsersStateStatus,
  selectUsersStateError,
};
