import { useState } from 'react';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? '');

  if (images.length === 0) {
    return <div className={styles.empty}>Изображение отсутствует</div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img className={styles.mainImage} src={selectedImage} alt={title} />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image) => (
            <button
              key={image}
              className={`${styles.thumbnail} ${image === selectedImage ? styles.active : ''}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`Показать изображение товара: ${title}`}
              aria-pressed={image === selectedImage}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
