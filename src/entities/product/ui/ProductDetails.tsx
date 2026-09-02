import type { Product } from '../model/types';

import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <dl className={styles.details}>
      <div>
        <dt>Категория</dt>
        <dd>{product.category}</dd>
      </div>

      <div>
        <dt>Бренд</dt>
        <dd>{product.brand ?? 'Не указан'}</dd>
      </div>

      <div>
        <dt>В наличии</dt>
        <dd>{product.stock}</dd>
      </div>

      <div>
        <dt>Артикул</dt>
        <dd>{product.sku}</dd>
      </div>

      <div>
        <dt>Доставка</dt>
        <dd>{product.shippingInformation}</dd>
      </div>

      <div>
        <dt>Гарантия</dt>
        <dd>{product.warrantyInformation}</dd>
      </div>
    </dl>
  );
}

export default ProductDetails;
