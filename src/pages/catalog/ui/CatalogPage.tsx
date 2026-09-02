import { useSearchParams } from 'react-router';

import CategoryFilter from '../../../features/filter-products/ui/CategoryFilter';
import SearchProducts from '../../../features/search-products/ui/SearchProducts';
import SortProducts from '../../../features/sort-products/ui/SortProducts';
import ProductGrid from '../../../widgets/product-grid/ui/ProductGrid';

import { DEFAULT_CATALOG_PARAMS, getCatalogSearchParams } from '../lib/catalogSearchParams';

import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const catalogParams = getCatalogSearchParams(searchParams);

  const handleSearch = (search: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (search) {
        nextParams.set('search', search);
      } else {
        nextParams.delete('search');
      }

      nextParams.set('page', String(DEFAULT_CATALOG_PARAMS.page));

      return nextParams;
    });
  };

  const handleClearSearch = () => {
    handleSearch('');
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (category) {
        nextParams.set('category', category);
      } else {
        nextParams.delete('category');
      }

      nextParams.set('page', String(DEFAULT_CATALOG_PARAMS.page));

      return nextParams;
    });
  };

  const handleSortChange = (
    sortBy: typeof DEFAULT_CATALOG_PARAMS.sortBy,
    order: typeof DEFAULT_CATALOG_PARAMS.order
  ) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (sortBy) {
        nextParams.set('sortBy', sortBy);
        nextParams.set('order', order);
      } else {
        nextParams.delete('sortBy');
        nextParams.delete('order');
      }

      nextParams.set('page', String(DEFAULT_CATALOG_PARAMS.page));

      return nextParams;
    });
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      nextParams.set('page', String(nextPage));

      return nextParams;
    });
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        {catalogParams.search ? `Результаты поиска: «${catalogParams.search}»` : 'Каталог товаров'}
      </h1>

      <div className={styles.controls}>
        <SearchProducts
          key={catalogParams.search}
          value={catalogParams.search}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        <div className={styles.filters}>
          <CategoryFilter value={catalogParams.category} onChange={handleCategoryChange} />

          <SortProducts
            sortBy={catalogParams.sortBy}
            order={catalogParams.order}
            onChange={handleSortChange}
          />
        </div>
      </div>

      <ProductGrid
        page={catalogParams.page}
        search={catalogParams.search}
        category={catalogParams.category}
        sortBy={catalogParams.sortBy}
        order={catalogParams.order}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default CatalogPage;
