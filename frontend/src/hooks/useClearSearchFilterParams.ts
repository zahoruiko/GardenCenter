import { useEffect } from 'react';

import { useAppDispatch } from 'redux/reduxHooks';
import {
  setMaxPrice,
  setMinPrice,
  setShowOnlyDiscountedProducts,
  setSortMode,
} from 'redux/slices/productsListFilterSlice';
import { setSearchTerm } from 'redux/slices/searchProductsSlice';

export const useClearSearchFilterParams = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMinPrice(''));
    dispatch(setMaxPrice(''));
    dispatch(setShowOnlyDiscountedProducts(false));
    dispatch(setSortMode(0));
    dispatch(setSearchTerm(''));
  }, [dispatch]);
};
