import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../../../entities/product/api/productApi';
import { productQueryKeys } from '../../../entities/product/model/queryKeys';
import type { ProductSortField, SortOrder } from '../../../entities/product/model/types';
import ProductCard from '../../../entities/product/ui/ProductCard';
import ProductCardSkeleton from '../../../entities/product/ui/ProductCardSkeleton';
import Button from '../../../shared/ui/Button/Button';
import EmptyState from '../../../shared/ui/EmptyState/EmptyState';
import ErrorMessage from '../../../shared/ui/ErrorMessage/ErrorMessage';
import Pagination from '../../../shared/ui/Pagination/Pagination';

import styles from './ProductGrid.module.scss';

const PRODUCTS_PER_PAGE = 12;

interface ProductGridProps {
  page: number;
  search: string;
  category: string;
  sortBy: ProductSortField | '';
  order: SortOrder;
  onPageChange: (page: number) => void;
}

function ProductGrid({ page, search, category, sortBy, order, onPageChange }: ProductGridProps) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const queryParams = {
    limit: PRODUCTS_PER_PAGE,
    skip,
    ...(search ? { search } : {}),
    ...(category && !search ? { category } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(sortBy ? { order } : {}),
  };

  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: productQueryKeys.list(queryParams),
    queryFn: () => getProducts(queryParams),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) {
    return (
      <section className={styles.grid} aria-label="Загрузка товаров">
        {Array.from({ length: PRODUCTS_PER_PAGE }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error.message}
        action={<Button onClick={() => void refetch()}>Повторить</Button>}
      />
    );
  }

  if (!data) {
    return <ErrorMessage message="Не удалось получить данные о товарах." />;
  }

  if (data.products.length === 0) {
    return (
      <EmptyState
        title={
          search
            ? `По запросу «${search}» товары не найдены`
            : category
              ? 'В этой категории товары не найдены'
              : 'Товары не найдены'
        }
        description={
          search
            ? 'Попробуйте изменить поисковый запрос.'
            : 'Попробуйте изменить параметры каталога.'
        }
      />
    );
  }

  const totalPages = Math.ceil(data.total / PRODUCTS_PER_PAGE);

  return (
    <>
      <section className={styles.grid} aria-label="Список товаров">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={isFetching}
      />

      {isFetching && <p className={styles.loading}>Обновление товаров...</p>}
    </>
  );
}

export default ProductGrid;
