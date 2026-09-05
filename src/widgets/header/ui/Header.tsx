import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { logout } from '../../../entities/user/model/authSlice';
import { selectCurrentUser, selectIsAuthenticated } from '../../../entities/user/model/selectors';

import styles from './Header.module.scss';

function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

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

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Профиль
              </NavLink>

              <span className={styles.user}>
                {user?.firstName} {user?.lastName}
              </span>

              <button className={styles.logoutButton} type="button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Вход
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
