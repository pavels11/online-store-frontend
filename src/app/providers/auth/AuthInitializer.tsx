import { useEffect } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { initializeAuth } from '../../../entities/user/model/authSlice';

function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
}

export default AuthInitializer;
