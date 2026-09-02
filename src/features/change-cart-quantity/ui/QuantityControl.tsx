import { useAppDispatch } from '../../../app/store/hooks';
import { setCartItemQuantity } from '../../../entities/cart/model/cartSlice';

import styles from './QuantityControl.module.scss';

interface QuantityControlProps {
  productId: number;
  quantity: number;
}

function QuantityControl({ productId, quantity }: QuantityControlProps) {
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    dispatch(
      setCartItemQuantity({
        productId,
        quantity: quantity - 1,
      })
    );
  };

  const handleIncrease = () => {
    dispatch(
      setCartItemQuantity({
        productId,
        quantity: quantity + 1,
      })
    );
  };

  return (
    <div className={styles.control}>
      <button
        className={styles.button}
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 1}
        aria-label="Уменьшить количество"
      >
        −
      </button>

      <span className={styles.quantity}>{quantity}</span>

      <button
        className={styles.button}
        type="button"
        onClick={handleIncrease}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
