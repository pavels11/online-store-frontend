import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>2026 Интернет-магазин</p>
      </div>
    </footer>
  );
}

export default Footer;
