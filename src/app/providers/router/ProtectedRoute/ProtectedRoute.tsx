import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '../../../store/hooks';
import { selectAuthStatus, selectIsAuthenticated } from '../../../../entities/user/model/selectors';
import Loader from '../../../../shared/ui/Loader/Loader';

import styles from './ProtectedRoute.module.scss';

function ProtectedRoute() {
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <Loader label="Проверка авторизации..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
