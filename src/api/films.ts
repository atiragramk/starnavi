import { client } from './client';

export const getFilmList = async () => {
  try {
    return await client.get<never, IFilmList>(`/films`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOneFilm = async (id: number) => {
  try {
    return await client.get<never, IFilm>(`/films/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
