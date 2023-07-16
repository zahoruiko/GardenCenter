import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from '../store';

type TProductsListFilterSliceState = {
  minPrice: string;
  maxPrice: string;
  showOnlyDiscountedProducts: boolean;
  sortMode: number;
  sortField: string;
  sortDirection: string;
}

const initialState: TProductsListFilterSliceState = {
  minPrice: "",
  maxPrice: "",
  showOnlyDiscountedProducts: false,
  sortMode: 0,
  sortField: "title",
  sortDirection: "asc",
};

const productsListFilterSlice = createSlice({
  name: "productsListFilter",
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setShowOnlyDiscountedProducts: (state, action) => {
      state.showOnlyDiscountedProducts = action.payload;
    },
    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
  },
});

export const productsListFilterReducer = productsListFilterSlice.reducer;

export const selectProductsListFilterSlice = (state: RootState) => state.sort;

export const {
  setMinPrice,
  setMaxPrice,
  setShowOnlyDiscountedProducts,
  setSortMode,
  setSortField,
  setSortDirection,
} = productsListFilterSlice.actions;
