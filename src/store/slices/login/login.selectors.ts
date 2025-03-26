import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';

import {LoginState} from './login.slice';

const selectLoginState: (state: RootState) => LoginState = (state) =>
  state.loginState;

const selectLoginStateStatus = createSelector(
  selectLoginState,
  (state) => state.status
);

const selectLoginStateError = createSelector(
  selectLoginState,
  (state) => state.error
);

const selectLoginStateId = createSelector(
  selectLoginState,
  (state) => state.id
);

const selectLoginStateIsAuth = createSelector(
  selectLoginState,
  (state) => state.isAuth
);

export const loginSelectors = {
  selectLoginStateStatus,
  selectLoginStateError,
  selectLoginStateId,
  selectLoginStateIsAuth,
};
