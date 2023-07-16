import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { cartReducer } from "./slices/cartSlice";
import { productsListFilterReducer } from "./slices/productsListFilterSlice";
import { searchProductsReducer } from "./slices/searchProductsSlice";
import { themeReducer } from "./slices/themeSlice";
import { translationReducer } from "./slices/translationSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchProductsReducer,
  sort: productsListFilterReducer,
  theme: themeReducer,
  translation: translationReducer
});

const persistConfig = {
  key: "gartenZentrum",
  storage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;