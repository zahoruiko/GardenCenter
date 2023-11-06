import { createSlice } from '@reduxjs/toolkit';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: Theme.LIGHT,
  },
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
