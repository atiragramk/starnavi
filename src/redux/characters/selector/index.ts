import { RootState } from '@/store';

export const tradeStateSelector = (state: RootState) => state.trade;
export const loadingStateSelector = (state: RootState) => state.loading;
