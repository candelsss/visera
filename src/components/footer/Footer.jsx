"use client";

import styles from './footer.module.css';
import Link from 'next/link';
import { useLanguage } from '@/components/language/LanguageProvider';
import { footer } from '@/content/translations';

export const Footer = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <footer className={styles.footer}>
      <button
        type="button"
        className={styles.lang}
        onClick={toggleLang}
        aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        {lang === 'es' ? '[EN]' : '[ES]'}
      </button>
      <div className={styles.links}>
        <Link href="https://www.instagram.com/viseraestudio/" target="_blank">[instagram]</Link>
        <a href="mailto:hola@viseraestudio.es">{footer.correo[lang]}</a>
      </div>
    </footer>
  );
};
