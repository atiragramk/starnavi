import { configureStore } from '@reduxjs/toolkit';
import characterList from '@/redux/characters/reducer';
import pagination from '@/redux/pagination/reducer';
import character from '@/redux/character/reducer';

export const rootReducer = {
  reducer: {
    characterList,
    pagination,
    character,
  },
};

export const store = configureStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
