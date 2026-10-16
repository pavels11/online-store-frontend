import type { SyntheticEvent } from 'react';

import localProductImages from '../model/localProductImages.json';

const imageMap = localProductImages as Record<string, string>;

export const PRODUCT_PLACEHOLDER = `${import.meta.env.BASE_URL}images/product-placeholder.svg`;

export function getLocalProductImage(imageUrl: string): string {
  const localPath = imageMap[imageUrl];

  if (!localPath) {
    return PRODUCT_PLACEHOLDER;
  }

  return `${import.meta.env.BASE_URL}${localPath}`;
}

export function handleProductImageError(event: SyntheticEvent<HTMLImageElement>): void {
  const image = event.currentTarget;

  if (image.src.endsWith('/images/product-placeholder.svg')) {
    return;
  }

  image.src = PRODUCT_PLACEHOLDER;
}
