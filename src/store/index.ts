import { configureStore } from '@reduxjs/toolkit';
import characterList from '../redux/characters/reducer';
import pagination from '../redux/pagination/reducer';

export const store = configureStore({
  reducer: {
    characterList,
    pagination,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
