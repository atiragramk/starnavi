import { createSlice } from '@reduxjs/toolkit';
import { characterFetch } from '../thunk';

interface ICharacterData {
  character: ICharacterDetails;
  films: IFilm[];
  starships: IStarShip[];
}
interface CharacterState {
  loading: boolean;
  error: boolean | null;
  data: ICharacterData | null;
}

const initialState: CharacterState = {
  loading: false,
  error: null,
  data: null,
};

const name = 'CHARACTER';

const characterSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(characterFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(characterFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(characterFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default characterSlice.reducer;
