import type { ProductSortField, SortOrder } from '../../../entities/product/model/types';

export interface CatalogSearchParams {
  search: string;
  category: string;
  sortBy: ProductSortField | '';
  order: SortOrder;
  page: number;
}

export const DEFAULT_CATALOG_PARAMS: CatalogSearchParams = {
  search: '',
  category: '',
  sortBy: '',
  order: 'asc',
  page: 1,
};

export function getCatalogSearchParams(searchParams: URLSearchParams): CatalogSearchParams {
  const pageParam = Number(searchParams.get('page'));

  const page =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_CATALOG_PARAMS.page;

  const search = searchParams.get('search')?.trim() ?? '';

  const category = searchParams.get('category')?.trim() ?? '';

  const sortByParam = searchParams.get('sortBy');

  const sortBy: ProductSortField | '' =
    sortByParam === 'title' || sortByParam === 'price' || sortByParam === 'rating'
      ? sortByParam
      : '';

  const orderParam = searchParams.get('order');

  const order: SortOrder = orderParam === 'desc' ? 'desc' : 'asc';

  return {
    search,
    category,
    sortBy,
    order,
    page,
  };
}
