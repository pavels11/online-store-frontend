import { useAppSelector } from '../../../app/store/hooks';
import { selectCartItemCount, selectCartTotal } from '../../../entities/cart/model/selectors';

import styles from './CartSummary.module.scss';

function CartSummary() {
  const itemCount = useAppSelector(selectCartItemCount);
  const total = useAppSelector(selectCartTotal);

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Итого</h2>

      <div className={styles.row}>
        <span>Товаров</span>
        <span>{itemCount}</span>
      </div>

      <div className={styles.row}>
        <span>Общая стоимость</span>
        <span className={styles.total}>${total.toFixed(2)}</span>
      </div>
    </aside>
  );
}

export default CartSummary;
