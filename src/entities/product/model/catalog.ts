export interface CatalogParams {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  page: number;
}
