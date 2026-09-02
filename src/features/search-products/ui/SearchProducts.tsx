import { useState, type SubmitEvent } from 'react';

import styles from './SearchProducts.module.scss';

interface SearchProductsProps {
  value: string;
  onSearch: (search: string) => void;
  onClear: () => void;
}

function SearchProducts({ value, onSearch, onClear }: SearchProductsProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="product-search">
        Поиск товаров
      </label>

      <div className={styles.controls}>
        <input
          id="product-search"
          className={styles.input}
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Введите название товара"
          autoComplete="off"
        />

        <button className={styles.submitButton} type="submit">
          Найти
        </button>

        {value && (
          <button className={styles.clearButton} type="button" onClick={handleClear}>
            Очистить
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchProducts;
