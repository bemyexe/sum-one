import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {usersReducer} from './slices/users-slice/users-slice';

export const store = configureStore({
  reducer: {
    usersState: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
