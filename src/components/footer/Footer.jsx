import styles from './footer.module.css';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://www.instagram.com/viseravisera/" target="_blank">[instagram]</Link>
      <a href="mailto:holaquetal@viseravisera.es">[correo]</a>
    </footer>
  );
};