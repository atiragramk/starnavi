import { PayloadAction } from '@reduxjs/toolkit';
import { IPaginationState } from '../reducer';

export const setCurrentPage = (
  state: IPaginationState,
  action: PayloadAction<Partial<IPaginationState>>
) => {
  return { ...state, ...action.payload };
};
