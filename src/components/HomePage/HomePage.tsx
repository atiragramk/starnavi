'use client';
import { charactersStateSelector } from '@/redux/characters/selector';
import { characterListFetch } from '@/redux/characters/thunk';
import { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import { paginationStateSelector } from '@/redux/pagination/selector';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading } = useSelector(charactersStateSelector);
  const { page, itemsPerPage } = useSelector(paginationStateSelector);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    dispatch(characterListFetch(page));
  }, [page]);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.count / itemsPerPage));
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-10">
      <p className="text-blue-500 text-6xl">Star Wars</p>
      <div className="min-h-[410px]">
        <div className="grid grid-cols-5 gap-8">
          {data?.results.map((character) => {
            return (
              <div
                key={character.id}
                className="flex flex-col gap-3 transform backdrop-blur-lg bg-blue-500/60 p-4 rounded-md hover:scale-105 hover:backdrop-blur-none cursor-pointer min-h-45 min-w-[190px]"
              >
                <p className="text-orange-500 uppercase font-medium">
                  {character.name}
                </p>
                <p className="text-gray-400">
                  Birth Year: {character.birth_year}
                </p>
                <p className="text-gray-400">Gender: {character.gender}</p>
                <p className="text-gray-400">
                  Skin Color: {character.skin_color}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {data && <Pagination pageCount={pageCount} />}
    </div>
  );
};

export default HomePage;
