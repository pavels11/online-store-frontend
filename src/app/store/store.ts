import { configureStore } from '@reduxjs/toolkit';

import { saveCart } from '../../entities/cart/lib/cartStorage';
import authReducer from '../../entities/user/model/authSlice';
import cartReducer from '../../entities/cart/model/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
