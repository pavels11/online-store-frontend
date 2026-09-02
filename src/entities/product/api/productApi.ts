import { api } from '../../../shared/api/axios';

import type { Category, GetProductsParams, Product, ProductsResponse } from '../model/types';

export async function getProducts({
  limit,
  skip,
  search,
  category,
  sortBy,
  order,
}: GetProductsParams): Promise<ProductsResponse> {
  let endpoint = '/products';

  if (search) {
    endpoint = '/products/search';
  } else if (category) {
    endpoint = `/products/category/${encodeURIComponent(category)}`;
  }

  const response = await api.get<ProductsResponse>(endpoint, {
    params: {
      limit,
      skip,
      ...(search ? { q: search } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(order ? { order } : {}),
    },
  });

  return response.data;
}

export async function getProductById(productId: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${productId}`);

  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>('/products/categories');

  return response.data;
}
