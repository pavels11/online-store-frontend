import type { CartState } from '../model/types';

const CART_STORAGE_KEY = 'online-store-cart';

export function loadCart(): CartState {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return {
      items: [],
    };
  }

  try {
    const parsedCart = JSON.parse(storedCart) as CartState;

    if (!Array.isArray(parsedCart.items)) {
      return {
        items: [],
      };
    }

    return parsedCart;
  } catch {
    return {
      items: [],
    };
  }
}

export function saveCart(cart: CartState): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
