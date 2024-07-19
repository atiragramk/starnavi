import { setCurrentPageAction } from '@/redux/pagination/reducer';
import { paginationStateSelector } from '@/redux/pagination/selector';
import { AppDispatch } from '@/store';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IPagination {
  pageCount: number;
}

const Pagination: FC<IPagination> = ({ pageCount }) => {
  const { page } = useSelector(paginationStateSelector);
  const dispatch: AppDispatch = useDispatch();

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageAction({ page }));
  };

  const handlePreviousPageClick = () => {
    dispatch(setCurrentPageAction({ page: page - 1 }));
  };
  const handleNextPageClick = () => {
    dispatch(setCurrentPageAction({ page: page + 1 }));
  };
  return (
    <nav aria-label="page-navigation">
      <ul className="flex items-center h-8 text-sm">
        <li>
          <a
            className={`flex items-center justify-center px-3 h-8 ms-0 text-gray-400 bg-blue-500 border border-blue-700 rounded-s-lg hover:bg-blue-700 hover:text-orange-500 ${
              page === 1 ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            onClick={handlePreviousPageClick}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {[...Array(pageCount).keys()].map((number, index) => {
          return (
            <li key={number}>
              <a
                className={`flex items-center justify-center px-3 h-8 leading-tight border  hover:bg-blue-700 hover:text-orange-500 cursor-pointer ${
                  page === index + 1
                    ? 'bg-orange-500 pointer-events-none text-blue-700 border-orange-500'
                    : 'bg-blue-500 text-gray-400 border-blue-700'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          );
        })}

        <li>
          <a
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-blue-500 border border-blue-700 rounded-e-lg hover:bg-blue-700 hover:text-orange-500 ${
              page === pageCount ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            onClick={handleNextPageClick}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
