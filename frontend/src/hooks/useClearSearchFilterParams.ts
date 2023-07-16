import { useEffect } from 'react';

import {
  setMinPrice,
  setMaxPrice,
  setShowOnlyDiscountedProducts,
  setSortMode,
} from '../redux/slices/productsListFilterSlice'
import { setSearchTerm } from '../redux/slices/searchProductsSlice';
import { useAppDispatch } from '../redux/reduxHooks';

export const useClearSearchFilterParams = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setShowOnlyDiscountedProducts(false));
    dispatch(setSortMode(0));
    dispatch(setSearchTerm(""));
  }, [dispatch]);
};
