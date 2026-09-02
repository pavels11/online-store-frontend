import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Пагинация товаров">
      <button
        type="button"
        className={styles.button}
        disabled={disabled || !canGoPrevious}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </button>

      <span className={styles.currentPage}>
        Страница {currentPage} из {totalPages}
      </span>

      <button
        type="button"
        className={styles.button}
        disabled={disabled || !canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Далее
      </button>
    </nav>
  );
}

export default Pagination;
