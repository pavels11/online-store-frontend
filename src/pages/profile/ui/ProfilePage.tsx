import { useAppSelector } from '../../../app/store/hooks';
import { selectCurrentUser } from '../../../entities/user/model/selectors';

import styles from './ProfilePage.module.scss';

function ProfilePage() {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Профиль</h1>

        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <img
              className={styles.avatar}
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.field}>
              <span className={styles.label}>Имя</span>
              <span className={styles.value}>{user.firstName}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Фамилия</span>
              <span className={styles.value}>{user.lastName}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Логин</span>
              <span className={styles.value}>{user.username}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user.email}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>ID пользователя</span>
              <span className={styles.value}>{user.id}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
