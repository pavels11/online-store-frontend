import styles from './Loader.module.scss';

interface LoaderProps {
  label?: string;
}

function Loader({ label = 'Загрузка...' }: LoaderProps) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export default Loader;
