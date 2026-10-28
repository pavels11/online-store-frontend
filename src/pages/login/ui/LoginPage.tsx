import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { login } from '../../../entities/user/model/authSlice';
import {
  selectAuthError,
  selectAuthStatus,
  selectIsAuthenticated,
} from '../../../entities/user/model/selectors';
import Button from '../../../shared/ui/Button/Button';

import styles from './LoginPage.module.scss';

const loginSchema = z.object({
  username: z.string().min(1, 'Введите логин.'),
  password: z.string().min(1, 'Введите пароль.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/catalog', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    await dispatch(login(values));
  };

  const isLoading = status === 'loading';

  return (
    <div className={styles.page}>
      <section className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Вход</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">
                Логин
              </label>

              <input
                className={styles.input}
                id="username"
                type="text"
                autoComplete="username"
                {...register('username')}
              />

              {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Пароль
              </label>

              <input
                className={styles.input}
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />

              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            {error && <p className={styles.serverError}>{error}</p>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <Link className={styles.backLink} to="/">
            Вернуться на главную
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
