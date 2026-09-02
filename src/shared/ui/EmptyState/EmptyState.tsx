import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className={styles.empty}>
      <h2 className={styles.title}>{title}</h2>

      {description && <p className={styles.description}>{description}</p>}
    </section>
  );
}

export default EmptyState;
