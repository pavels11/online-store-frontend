import { useAppSelector } from '../../../app/store/hooks';
import { selectCartItems } from '../../../entities/cart/model/selectors';
import CartItem from '../../../entities/cart/ui/CartItem';
import CartSummary from '../../../widgets/cart-summary/ui/CartSummary';

import styles from './CartPage.module.scss';

function CartPage() {
  const items = useAppSelector(selectCartItems);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>

      {items.length === 0 ? (
        <section className={styles.empty}>
          <h2 className={styles.emptyTitle}>Корзина пуста</h2>

          <p className={styles.emptyDescription}>
            Добавьте товары из каталога, чтобы они появились здесь.
          </p>
        </section>
      ) : (
        <div className={styles.cart}>
          <section className={styles.items} aria-label="Товары в корзине">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </section>

          <CartSummary />
        </div>
      )}
    </main>
  );
}

export default CartPage;
