import { client } from './client';

export const getCharacterList = async (page: number) => {
  try {
    return await client.get<never, ICharacterList>(`/people/?page=${page}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOneCharacter = async (id: string) => {
  try {
    return await client.get<never, ICharacterDetails>(`/people/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
