import { createSlice } from "@reduxjs/toolkit";

export enum TTranslation {
  ENGLISH = 'en',
  GERMAN = 'de',
}

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    translationCode: TTranslation.ENGLISH,
  },
  reducers: {
    setTranslationCode: (state, action) => {
      state.translationCode = action.payload;
    },
  },
});

export const translationReducer = translationSlice.reducer;

export const {
  setTranslationCode,
} = translationSlice.actions;
