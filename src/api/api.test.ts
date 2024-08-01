import mockAxios from 'jest-mock-axios';
import { getCharacterList, getOneCharacter } from './characters';
import { getFilmList, getOneFilm } from './films';
import { client } from './client';
import { getOneStarShip, getStarShipList } from './starships';

// Mock axios client
jest.mock('axios', () => ({
  create: () => mockAxios,
}));

// Clear mock after tests
afterEach(() => {
  mockAxios.reset();
});

//Axios client
describe('Axios client', () => {
  it('should have the correct base URL', () => {
    expect(client.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_APP_API);
  });

  it('should return response data directly', async () => {
    const response = { result: 'success' };
    mockAxios.get.mockResolvedValueOnce(response);

    const result = await client.get('/test');

    expect(result).toEqual(response);
  });

  it('should handle error properly', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    await expect(client.get('/test')).rejects.toThrow('Network Error');
  });
});

//Characters
describe('getCharacterList', () => {
  it('should fetch character list for a given page', async () => {
    // Mocked response data
    const data = {
      count: 82,
      next: 'https://sw-api.starnavi.io/people/?page=2',
      previous: null,
      results: [
        {
          id: 10,
          name: 'Obi-Wan Kenobi',
          height: '182',
          mass: '77',
          hair_color: 'auburn, white',
          skin_color: 'fair',
          eye_color: 'blue-gray',
          birth_year: '57BBY',
          gender: 'male',
          homeworld: 20,
          films: [1, 2, 3, 4, 5, 6],
          species: [1],
          vehicles: [38],
          starships: [48, 59, 64, 65, 74],
          created: '2014-12-10T16:16:29.192000Z',
          edited: '2014-12-20T21:17:50.325000Z',
          url: 'https://sw-api.starnavi.io/people/10/',
        },
        {
          id: 12,
          name: 'Wilhuff Tarkin',
          height: '180',
          mass: 'unknown',
          hair_color: 'auburn, grey',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '64BBY',
          gender: 'male',
          homeworld: 21,
          films: [1, 6],
          species: [1],
          vehicles: [],
          starships: [],
          created: '2014-12-10T16:26:56.138000Z',
          edited: '2014-12-20T21:17:50.330000Z',
          url: 'https://sw-api.starnavi.io/people/12/',
        },
      ],
    };

    mockAxios.get.mockResolvedValueOnce(data);

    const page = 1;
    const response = await getCharacterList(page);

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/people/?page=${page}`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    const page = 1;
    await expect(getCharacterList(page)).rejects.toThrow('Network Error');
  });
});

describe('getOneCharacter', () => {
  it('should fetch one character by id', async () => {
    // Mocked response data
    const data = {
      id: 1,
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 1,
      films: [1, 2, 3, 6],
      species: [1],
      vehicles: [14, 30],
      starships: [12, 22],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://sw-api.starnavi.io/people/1/',
    };
    mockAxios.get.mockResolvedValueOnce(data);

    const id = '1';
    const response = await getOneCharacter(id);

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/people/${id}`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    const id = '1';
    await expect(getOneCharacter(id)).rejects.toThrow('Network Error');
  });
});

//Films

describe('getFilmList', () => {
  it('should fetch film list', async () => {
    // Mocked response data
    const data = {
      count: 6,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          title: 'A New Hope',
          episode_id: 4,
          opening_crawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: [
            10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81,
          ],
          planets: [1, 2, 3],
          starships: [2, 3, 5, 9, 10, 11, 12, 13],
          vehicles: [4, 6, 7, 8],
          species: [1, 2, 3, 4, 5],
          created: '2014-12-10T14:23:31.880000Z',
          edited: '2014-12-20T19:49:45.256000Z',
          url: 'https://sw-api.starnavi.io/films/1/',
        },
      ],
    };

    mockAxios.get.mockResolvedValueOnce(data);

    const response = await getFilmList();

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/films`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    await expect(getFilmList()).rejects.toThrow('Network Error');
  });
});

describe('getOneFilm', () => {
  it('should fetch one film by id', async () => {
    // Mocked response data
    const data = {
      id: 1,
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [
        10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81,
      ],
      planets: [1, 2, 3],
      starships: [2, 3, 5, 9, 10, 11, 12, 13],
      vehicles: [4, 6, 7, 8],
      species: [1, 2, 3, 4, 5],
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
      url: 'https://sw-api.starnavi.io/films/1/',
    };
    mockAxios.get.mockResolvedValueOnce(data);

    const id = 1;
    const response = await getOneFilm(id);

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/films/${id}`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    const id = 1;
    await expect(getOneFilm(id)).rejects.toThrow('Network Error');
  });
});

//Starships

describe('getStarShipList', () => {
  it('should fetch film list', async () => {
    // Mocked response data
    const data = {
      count: 36,
      next: 'https://sw-api.starnavi.io/starships/?page=2',
      previous: null,
      results: [
        {
          id: 9,
          name: 'Death Star',
          model: 'DS-1 Orbital Battle Station',
          manufacturer:
            'Imperial Department of Military Research, Sienar Fleet Systems',
          cost_in_credits: '1000000000000',
          length: '120000',
          max_atmosphering_speed: 'n/a',
          crew: '342,953',
          passengers: '843,342',
          cargo_capacity: '1000000000000',
          consumables: '3 years',
          hyperdrive_rating: '4.0',
          MGLT: '10',
          starship_class: 'Deep Space Mobile Battlestation',
          pilots: [],
          films: [1],
          created: '2014-12-10T16:36:50.509000Z',
          edited: '2014-12-20T21:26:24.783000Z',
          url: 'https://sw-api.starnavi.io/starships/9/',
        },
      ],
    };

    mockAxios.get.mockResolvedValueOnce(data);

    const response = await getStarShipList();

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/starships`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    await expect(getStarShipList()).rejects.toThrow('Network Error');
  });
});

describe('getOneStarShip', () => {
  it('should fetch one film by id', async () => {
    // Mocked response data
    const data = {
      id: 9,
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      manufacturer:
        'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: '1000000000000',
      length: '120000',
      max_atmosphering_speed: 'n/a',
      crew: '342,953',
      passengers: '843,342',
      cargo_capacity: '1000000000000',
      consumables: '3 years',
      hyperdrive_rating: '4.0',
      MGLT: '10',
      starship_class: 'Deep Space Mobile Battlestation',
      pilots: [],
      films: [1],
      created: '2014-12-10T16:36:50.509000Z',
      edited: '2014-12-20T21:26:24.783000Z',
      url: 'https://sw-api.starnavi.io/starships/9/',
    };
    mockAxios.get.mockResolvedValueOnce(data);

    const id = 1;
    const response = await getOneStarShip(id);

    expect(response).toEqual(data);
    expect(mockAxios.get).toHaveBeenCalledWith(`/starships/${id}`);
  });

  it('should handle error', async () => {
    const error = new Error('Network Error');
    mockAxios.get.mockRejectedValueOnce(error);

    const id = 1;
    await expect(getOneStarShip(id)).rejects.toThrow('Network Error');
  });
});
