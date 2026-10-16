import QuantityControl from '../../../features/change-cart-quantity/ui/QuantityControl';
import RemoveFromCartButton from '../../../features/remove-from-cart/ui/RemoveFromCartButton';

import {
  getLocalProductImage,
  handleProductImageError,
} from '../../product/lib/getLocalProductImage';

import type { CartItem as CartItemType } from '../model/types';

import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const itemTotal = item.price * item.quantity;

  return (
    <article className={styles.item}>
      <img
        className={styles.image}
        src={getLocalProductImage(item.thumbnail)}
        alt={item.title}
        onError={handleProductImageError}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>

        <p className={styles.price}>${item.price.toFixed(2)}</p>

        <QuantityControl productId={item.productId} quantity={item.quantity} />

        <p className={styles.itemTotal}>Сумма: ${itemTotal.toFixed(2)}</p>

        <RemoveFromCartButton productId={item.productId} />
      </div>
    </article>
  );
}

export default CartItem;
