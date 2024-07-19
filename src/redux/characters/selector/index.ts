import { RootState } from '@/store';

export const charactersStateSelector = (state: RootState) =>
  state.characterList;
