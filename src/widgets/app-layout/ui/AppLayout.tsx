import { Outlet } from 'react-router';

import Footer from '../../footer/ui/Footer';
import Header from '../../header/ui/Header';

import styles from './AppLayout.module.scss';

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
