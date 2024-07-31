import { client } from './client';

export const getStarShipList = async () => {
  try {
    return await client.get<never, IStarShipList>(`/starships`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOneStarShip = async (id: number) => {
  try {
    return await client.get<never, IStarShip>(`/starships/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
