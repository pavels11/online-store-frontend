import styles from './ProductCardSkeleton.module.scss';

function ProductCardSkeleton() {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.title} />

        <div className={styles.description} />
        <div className={styles.description} />
        <div className={styles.shortDescription} />

        <div className={styles.footer}>
          <div className={styles.price} />
          <div className={styles.rating} />
        </div>
      </div>
    </article>
  );
}

export default ProductCardSkeleton;
