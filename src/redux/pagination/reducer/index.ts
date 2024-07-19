import { createSlice } from '@reduxjs/toolkit';
import { setCurrentPage } from '../actions';

export interface IPaginationState {
  page: number;
  itemsPerPage: number;
}

export const initialState: IPaginationState = {
  page: 1,
  itemsPerPage: 10,
};

const name = 'PAGINATION';

const paginationSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentPage,
  },
});

export const { setCurrentPage: setCurrentPageAction } = paginationSlice.actions;
export default paginationSlice.reducer;
