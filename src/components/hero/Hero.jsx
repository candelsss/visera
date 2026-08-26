import styles from "./hero.module.css";

const projects = [
  {
    title: "HECTOR",
    image: "/img/hector.png",
  },
  {
    title: "Spanish Mafia",
    image: "/img/spanish-mafia.png",
  },
  {
    title: "una vioska.",
    image: "/img/una-vioska.png",
  },
  {
    title: "La Mesita",
    image: "/img/spanish-mafia.png",
  },
  {
    title: "LITERAL",
    image: "/img/hector.png",
  },
  {
    title: "una vioska. 2",
    image: "/img/una-vioska.png",
  },
];

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
        {projects.map((project) => (
          <img
            key={project.title}
            className={styles.img}
            src={project.image}
            alt={project.title}
          />
        ))}
      </div>
    </div>
  );
};
