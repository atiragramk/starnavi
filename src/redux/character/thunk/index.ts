import { getOneCharacter } from '@/api/characters';
import { getFilmList, getOneFilm } from '@/api/films';
import { getOneStarShip } from '@/api/starships';
import { createAsyncThunk } from '@reduxjs/toolkit';

const CHARACTER_FETCH_THUNK_TYPE = 'CHARACTER_FETCH_THUNK_TYPE';

export const characterFetch = createAsyncThunk(
  CHARACTER_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const characterData = await getOneCharacter(id);

      const filmList = await getFilmList();
      const films = filmList.results.filter((film) =>
        characterData.films.includes(film.id)
      );
      if (characterData.starships.length) {
        const starshipsPromises = characterData.starships.map((starshipId) =>
          getOneStarShip(starshipId)
        );
        const starships = await Promise.all(starshipsPromises);

        return {
          character: characterData,
          films,
          starships,
        };
      }

      return {
        character: characterData,
        films,
        starships: [],
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
