import { NavLink } from 'react-router';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navigation} aria-label="Основная навигация">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Главная
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Каталог
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Корзина
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Вход
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
