import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../../../entities/product/api/productApi';
import { productQueryKeys } from '../../../entities/product/model/queryKeys';

import styles from './CategoryFilter.module.scss';

interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: productQueryKeys.categories(),
    queryFn: getCategories,
  });

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="category-filter">
        Категория
      </label>

      <select
        id="category-filter"
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={isPending || isError}
      >
        <option value="">Все категории</option>

        {categories?.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      {isError && <p className={styles.error}>Не удалось загрузить категории.</p>}
    </div>
  );
}

export default CategoryFilter;
