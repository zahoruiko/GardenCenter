import {
  useEffect,
  useState,
} from 'react';

import { useAppSelector } from '../redux/reduxHooks';
import {
  getMaxPrice,
  getMinPrice,
} from './utils/getMinMaxPrice';
import { getQuerySortParams } from './utils/getQuerySortParams';

export const useSearchProductsPageSourceDataUrl = (
  listCurrentPart: number,
  limit: number
) => {
  let offset = listCurrentPart * limit;

  const searchTermState = useAppSelector((state) => state.search.searchTerm);
  const currentMinPriceState = useAppSelector((state) => state.sort.minPrice);
  const currentMaxPriceState = useAppSelector((state) => state.sort.maxPrice);
  const currentShowOnlyDiscountedProductsState = useAppSelector(
    (state) => state.sort.showOnlyDiscountedProducts
  );
  const currentSortModeState = useAppSelector((state) => state.sort.sortMode);
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    let minPrice = getMinPrice(+currentMinPriceState);
    let maxPrice = getMaxPrice(+currentMaxPriceState);
    const querySortParams = getQuerySortParams(currentSortModeState);

    if (currentShowOnlyDiscountedProductsState) {
      setDataUrl(
        `/products/find/${searchTermState}/discounted/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`
      );
    } else {
      setDataUrl(
        `/products/find/${searchTermState}/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`
      );
    }
  }, [
    searchTermState,
    currentMaxPriceState,
    currentMinPriceState,
    currentShowOnlyDiscountedProductsState,
    currentSortModeState,
    limit,
    offset,
  ]);

  return dataUrl;
};
