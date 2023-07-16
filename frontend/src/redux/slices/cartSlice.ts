import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import { TProductItem } from "../../components/Products/@Types/ProductTypes";
import type { RootState } from '../store';

export type TCartItem = TProductItem & { quantity: number; }

export type TCartStatistic = {
  totalSum: number;
  totalQuantity: number;
}

export type TCartState = {
  cart: TCartItem[];
  cartStatistic: TCartStatistic;
}

const initialState: TCartState = {
  cart: [],
  cartStatistic: { "totalSum": 0, "totalQuantity": 0 }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: TCartState, action: PayloadAction<TProductItem>) => {
      const itemInCart = state.cart.find(
        (item: TCartItem) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.cartStatistic = getShoppingCartStatistic(state);
    },
    incrementQuantity: (state: TCartState, action: PayloadAction<number>) => {
      const item = state.cart.find((item: TCartItem) => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.cartStatistic = getShoppingCartStatistic(state);
      }
    },
    decrementQuantity: (state: TCartState, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          // item.quantity = 1;
          const remainingItems = state.cart.filter(
            (item) => item.id !== action.payload
          );
          state.cart = remainingItems;
          state.cartStatistic = getShoppingCartStatistic(state);
        } else {
          item.quantity--;
        }
        state.cartStatistic = getShoppingCartStatistic(state);
      }
    },
    removeItem: (state: TCartState, action: PayloadAction<number>) => {
      const remainingItems = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = remainingItems;
      state.cartStatistic = getShoppingCartStatistic(state);
    },
    removeAllItems: (state: TCartState) => {
      state.cart = [];
      state.cartStatistic = getShoppingCartStatistic(state);
    },
  },
});


type getShoppingCartStatisticProps = (cart: TCartState) => TCartStatistic

const getShoppingCartStatistic: getShoppingCartStatisticProps = (data) => {
  const cartItems = data.cart;
  const cart = cartItems.reduce(
    (acc: TCartStatistic, item: TCartItem) => {
      let itemSum: number;
      if (item.discont_price) {
        itemSum = Math.round(item.discont_price) * item.quantity;
      } else {
        itemSum = Math.round(item.price) * item.quantity;
      }
      acc.totalSum = Math.round(acc.totalSum + itemSum);
      acc.totalQuantity = acc.totalQuantity + item.quantity;
      return acc;
    },
    {
      totalSum: 0,
      totalQuantity: 0,
    }
  );
  return cart;
};

export const cartReducer = cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, decrementQuantity, incrementQuantity, removeItem, removeAllItems } = cartSlice.actions;
