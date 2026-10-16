import { useState } from 'react';

import { getLocalProductImage, handleProductImageError } from '../lib/getLocalProductImage';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return <div className={styles.empty}>Изображение отсутствует</div>;
  }

  const selectedImage = images[selectedIndex] ?? images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          className={styles.mainImage}
          src={getLocalProductImage(selectedImage)}
          alt={title}
          onError={handleProductImageError}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={image}
              className={`${styles.thumbnail} ${index === selectedIndex ? styles.active : ''}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Показать изображение товара: ${title}`}
              aria-pressed={index === selectedIndex}
            >
              <img src={getLocalProductImage(image)} alt="" onError={handleProductImageError} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
