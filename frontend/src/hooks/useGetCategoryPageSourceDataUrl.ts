import { useEffect, useState } from 'react';

import { getMinPrice, getMaxPrice } from './utils/getMinMaxPrice';
import { getQuerySortParams } from './utils/getQuerySortParams';
import { useAppSelector } from '../redux/reduxHooks';

export const useGetCategoryPageSourceDataUrl = (categoryId: number, listCurrentPart: number, limit: number) => {
  let offset = listCurrentPart * limit;

  const currentMinPriceState = useAppSelector(state => state.sort.minPrice);
  const currentMaxPriceState = useAppSelector(state => state.sort.maxPrice);
  const currentShowOnlyDiscountedProductsState = useAppSelector(state => state.sort.showOnlyDiscountedProducts);
  const currentSortModeState = useAppSelector(state => state.sort.sortMode);
  const currentSearchTermState = useAppSelector(state => state.search.searchTerm);

  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    let minPrice = getMinPrice(+currentMinPriceState);
    let maxPrice = getMaxPrice(+currentMaxPriceState);
    const querySortParams = getQuerySortParams(currentSortModeState);

    if (currentSearchTermState === "") {
      if (currentShowOnlyDiscountedProductsState) {
        setDataUrl(`/products/category/${categoryId}/discounted/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      } else {
        setDataUrl(`/products/category/${categoryId}/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      }
    } else {
      if (currentShowOnlyDiscountedProductsState) {
        setDataUrl(`/products/category/${categoryId}/searchTerm/${currentSearchTermState}/discounted/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      } else {
        setDataUrl(`/products/category/${categoryId}/searchTerm/${currentSearchTermState}/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      }
    }

  }, [categoryId, currentMaxPriceState, currentMinPriceState, currentSearchTermState, currentShowOnlyDiscountedProductsState, currentSortModeState, limit, offset]);

  return dataUrl;
};
