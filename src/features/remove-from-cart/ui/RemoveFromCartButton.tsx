import { useAppDispatch } from '../../../app/store/hooks';
import { removeFromCart } from '../../../entities/cart/model/cartSlice';

import styles from './RemoveFromCartButton.module.scss';

interface RemoveFromCartButtonProps {
  productId: number;
}

function RemoveFromCartButton({ productId }: RemoveFromCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(productId));
  };

  return (
    <button className={styles.button} type="button" onClick={handleRemove}>
      Удалить
    </button>
  );
}

export default RemoveFromCartButton;
