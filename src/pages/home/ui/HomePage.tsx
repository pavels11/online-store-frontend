import { Link } from 'react-router';

import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.logo}>Интернет-магазин</p>

          <h1 className={styles.title}>Выберите товар</h1>

          <Link className={styles.button} to="/catalog">
            Перейти в каталог
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
