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

export const useAllProductsSourceDataUrl = (listCurrentPart: number, limit: number) => {
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
        setDataUrl(`/products/all/discounted/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      } else {
        setDataUrl(`/products/all/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      }
    } else {
      if (currentShowOnlyDiscountedProductsState) {
        setDataUrl(`/products/find/${currentSearchTermState}/discounted/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      } else {
        setDataUrl(`/products/find/${currentSearchTermState}/minPrice/${minPrice}/maxPrice/${maxPrice}/sortBy/${querySortParams.sortFieldName}/sortDirection/${querySortParams.sortDirection}?offset=${offset}&limit=${limit}`);
      }
    };
  }, [currentMaxPriceState, currentMinPriceState, currentSearchTermState, currentShowOnlyDiscountedProductsState, currentSortModeState, limit, offset]);

  return dataUrl;
}
