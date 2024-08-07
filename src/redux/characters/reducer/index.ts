import { createSlice } from '@reduxjs/toolkit';
import { characterListFetch } from '../thunk';

interface CharacterListState {
  loading: boolean;
  error: boolean | null;
  data: ICharacterList | null;
}

const initialState: CharacterListState = {
  loading: false,
  error: null,
  data: null,
};

const name = 'CHARACTER_LIST';

const characterListSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(characterListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(characterListFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(characterListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default characterListSlice.reducer;
