import styles from "./hero.module.css";

export const IntroP = ({ children }) => (
  <p className={styles.introP}>{children}</p>
);

export const Hero = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.intro}>{children}</div>

      <div className={styles.vector}>
        <img src="/img/vector.webp" alt="visera" />
      </div>

      <div className={styles.images}>
        <div className={styles.img}></div>
        <div className={styles.img}></div>
        <div className={styles.img}></div>
        <div className={styles.img}></div>
        <div className={styles.img}></div>
        <div className={styles.img}></div>
      </div>
    </div>
  );
};
