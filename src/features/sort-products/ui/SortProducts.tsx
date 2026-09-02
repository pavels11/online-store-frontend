import type { ProductSortField, SortOrder } from '../../../entities/product/model/types';

import styles from './SortProducts.module.scss';

interface SortProductsProps {
  sortBy: ProductSortField | '';
  order: SortOrder;
  onChange: (sortBy: ProductSortField | '', order: SortOrder) => void;
}

function SortProducts({ sortBy, order, onChange }: SortProductsProps) {
  const handleSortByChange = (nextSortBy: ProductSortField | '') => {
    onChange(nextSortBy, nextSortBy ? order : 'asc');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="sort-by">
          Сортировка
        </label>

        <select
          id="sort-by"
          className={styles.select}
          value={sortBy}
          onChange={(event) => handleSortByChange(event.target.value as ProductSortField | '')}
        >
          <option value="">Без сортировки</option>
          <option value="title">Название</option>
          <option value="price">Цена</option>
          <option value="rating">Рейтинг</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="sort-order">
          Порядок
        </label>

        <select
          id="sort-order"
          className={styles.select}
          value={order}
          disabled={!sortBy}
          onChange={(event) => onChange(sortBy, event.target.value as SortOrder)}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>
  );
}

export default SortProducts;
