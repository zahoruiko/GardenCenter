import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import axios from "../axios";
import { useDebouncedValue } from './useDebouncedValue';

import { TCategoryItem } from "../components/Categories/@Types/CategoryTypes";
import { TProductItem } from "../components/Products/@Types/ProductTypes";

export type TProductsListResponse = {
  status: string;
  itemsAmount: number;
  category?: TCategoryItem;
  data: TProductItem[];
};

export type TCategoriesListResponse = {
  status: string;
  data: TCategoryItem[];
};

export function useRemoteDataFetch(uri: string) {
  const [data, setData] = useState<TProductsListResponse | TCategoriesListResponse | any>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const debounceTime = 600;
  const debouncedUri = useDebouncedValue(uri, debounceTime);

  useEffect(() => {
    if (!debouncedUri) return;
    const getRemoteData = async () => {
      await axios.get<TProductsListResponse | TCategoriesListResponse>(debouncedUri)
        .then(data => {
          setData(data);
          setError(undefined);
          setLoading(false);
        })
        .catch(error => {
          setError(error)
          setData(undefined);
          setLoading(false);
        });
    }
    getRemoteData();
  }, [debouncedUri]);

  return {
    loading,
    data,
    error
  };
};
