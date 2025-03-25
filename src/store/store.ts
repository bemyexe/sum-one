import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {loginReducer} from './slices/login/login.slice';
import {usersReducer} from './slices/users/users.slice';

export const store = configureStore({
  reducer: {
    usersState: usersReducer,
    loginState: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
