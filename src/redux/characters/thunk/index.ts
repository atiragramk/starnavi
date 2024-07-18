import { getCharacterList } from '@/api/characters';
import { createAsyncThunk } from '@reduxjs/toolkit';

const CHARACTER_LIST_FETCH_THUNK_TYPE = 'CHARACTER_LIST_FETCH_THUNK_TYPE';

export const characterListFetch = createAsyncThunk(
  CHARACTER_LIST_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getCharacterList();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
