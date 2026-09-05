import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus, selectIsAuthenticated } from '../../../entities/user/model/selectors';

function ProtectedRoute() {
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (status === 'loading') {
    return <div>Проверка авторизации...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
