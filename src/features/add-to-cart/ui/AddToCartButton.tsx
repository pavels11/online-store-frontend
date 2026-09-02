import { useAppDispatch } from '../../../app/store/hooks';
import { addToCart } from '../../../entities/cart/model/cartSlice';
import type { Product } from '../../../entities/product/model/types';

import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button className={styles.button} type="button" onClick={handleAddToCart}>
      Добавить в корзину
    </button>
  );
}

export default AddToCartButton;
