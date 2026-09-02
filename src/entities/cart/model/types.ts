export interface CartItem {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
