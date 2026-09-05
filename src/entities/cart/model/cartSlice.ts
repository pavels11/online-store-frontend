import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../product/model/types';

import { loadCart } from '../lib/cartStorage';
import type { CartState } from './types';

const initialState: CartState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        existingItem.quantity += 1;

        return;
      }

      state.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },

    setCartItemQuantity(
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>
    ) {
      const { productId, quantity } = action.payload;

      const item = state.items.find((item) => item.productId === productId);

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.productId !== productId);

        return;
      }

      item.quantity = quantity;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
