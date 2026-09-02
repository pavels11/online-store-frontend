import type { GetProductsParams } from './types';

export const productQueryKeys = {
  all: ['products'] as const,

  lists: () => [...productQueryKeys.all, 'list'] as const,

  list: (params: GetProductsParams) => [...productQueryKeys.lists(), params] as const,

  details: () => [...productQueryKeys.all, 'detail'] as const,

  detail: (id: number) => [...productQueryKeys.details(), id] as const,

  categories: () => [...productQueryKeys.all, 'categories'] as const,
};
