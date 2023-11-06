import { createSlice } from '@reduxjs/toolkit';

const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState: {
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const searchProductsReducer = searchProductsSlice.reducer;

export const { setSearchTerm } = searchProductsSlice.actions;
