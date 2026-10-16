import { Link } from 'react-router';

import AddToCartButton from '../../../features/add-to-cart/ui/AddToCartButton';
import { getLocalProductImage, handleProductImageError } from '../lib/getLocalProductImage';
import type { Product } from '../model/types';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link className={styles.link} to={`/product/${product.id}`}>
        <img
          className={styles.image}
          src={getLocalProductImage(product.thumbnail)}
          alt={product.title}
          onError={handleProductImageError}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>{product.title}</h2>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.footer}>
            <span className={styles.price}>${product.price}</span>

            <span className={styles.rating}>★ {product.rating}</span>
          </div>
        </div>
      </Link>

      <div className={styles.actions}>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

export default ProductCard;
