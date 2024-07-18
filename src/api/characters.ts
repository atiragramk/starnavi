import { client } from './client';

export const getCharacterList = async () => {
  try {
    return await client.get<never, ICharacterList>(`/people`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOneCharacter = async (id: number) => {
  try {
    return await client.get<never, ICharacterDetails>(`/people/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
