import { configureStore } from '@reduxjs/toolkit';
import characterList from '../redux/characters/reducer';

export const store = configureStore({
  reducer: {
    characterList,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
