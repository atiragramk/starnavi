'use client';
import { charactersStateSelector } from '@/redux/characters/selector';
import { characterListFetch } from '@/redux/characters/thunk';
import { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import { paginationStateSelector } from '@/redux/pagination/selector';
import { useRouter } from 'next/navigation';
import loadingGif from '../../../public/img/loading.gif';
import Image from 'next/image';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading } = useSelector(charactersStateSelector);
  const { page, itemsPerPage } = useSelector(paginationStateSelector);
  const [pageCount, setPageCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    dispatch(characterListFetch(page));
  }, [page, dispatch]);

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.count / itemsPerPage));
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-10">
      {loading && !data && (
        <div className="flex flex-col items-center my-5">
          <Image src={loadingGif} alt="loading-gif" width={200} height={200} />
        </div>
      )}
      <div className="grid grid-cols-5 gap-8 p-10 min-h-[550px]">
        {data?.results.map((character) => {
          return (
            <div
              key={character.id}
              className="flex flex-col gap-2 transform backdrop-blur-lg bg-blue-500/60 p-4 rounded-md hover:scale-105 hover:backdrop-blur-none cursor-pointer h-[220px] w-[250px]"
              onClick={() => router.push(`character/${character.id}`)}
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
      {data && <Pagination pageCount={pageCount} />}
    </div>
  );
};

export default HomePage;
