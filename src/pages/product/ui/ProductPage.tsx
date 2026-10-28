import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getProductById } from '../../../entities/product/api/productApi';
import { productQueryKeys } from '../../../entities/product/model/queryKeys';
import ProductDetails from '../../../entities/product/ui/ProductDetails';
import ProductGallery from '../../../entities/product/ui/ProductGallery';
import ProductPrice from '../../../entities/product/ui/ProductPrice';
import ProductRating from '../../../entities/product/ui/ProductRating';
import AddToCartButton from '../../../features/add-to-cart/ui/AddToCartButton';
import ErrorMessage from '../../../shared/ui/ErrorMessage/ErrorMessage';
import Loader from '../../../shared/ui/Loader/Loader';

import styles from './ProductPage.module.scss';

function ProductPage() {
  const { id } = useParams();

  const productId = Number(id);

  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const { data, isPending, isError, error } = useQuery({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: isValidProductId,
  });

  if (!isValidProductId) {
    return <ErrorMessage message="Некорректный идентификатор товара." />;
  }

  if (isPending) {
    return (
      <div className={styles.loading}>
        <Loader label="Загрузка товара..." />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data) {
    return <ErrorMessage message="Товар не найден." />;
  }

  return (
    <div className={styles.page}>
      <Link className={styles.backLink} to="/catalog">
        ← Вернуться в каталог
      </Link>

      <div className={styles.product}>
        <ProductGallery images={data.images} title={data.title} />

        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>

          <ProductRating rating={data.rating} />

          <p className={styles.description}>{data.description}</p>

          <ProductDetails product={data} />

          <ProductPrice price={data.price} discountPercentage={data.discountPercentage} />

          <AddToCartButton product={data} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
