"use client";

import { useEffect, useRef } from "react";
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

const SPEED = 45; // px/s del carrusel automático (claro y oscuro)

export const IntroP = ({ children }) => (
  <p className={styles.introP}>{children}</p>
);

export const Hero = ({ children }) => {
  const imagesRef = useRef(null);
  // Posición continua del carrusel, en "número de imagen" (ej. 3.4 =
  // un 40% entre la imagen 3 y la 4) — NO en píxeles. Así, al cambiar
  // de tema (donde el tamaño de cada imagen cambia mucho), la posición
  // relativa dentro de la secuencia se conserva exacta; solo cambia
  // cuántos píxeles ocupa cada unidad de índice.
  const indexRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = imagesRef.current;
    if (!el) return;

    const getMetrics = () => {
      const first = el.children[0];
      const imgWidth = first.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      return { imgWidth, step: imgWidth + gap };
    };

    const paint = () => {
      const { imgWidth, step } = getMetrics();
      // Se centra siempre sobre la copia del MEDIO de las tres que se
      // renderizan (ver más abajo), nunca sobre la primera: así hay
      // siempre una copia entera de sobra a cada lado, y no se ve
      // ningún hueco vacío al principio ni cada vez que da la vuelta.
      const displayIndex = projects.length + indexRef.current;
      const offset =
        el.clientWidth / 2 - imgWidth / 2 - displayIndex * step;
      el.style.transform = `translateX(${offset}px)`;
    };

    // Carrusel automático e infinito, en claro y en oscuro. La lista
    // de imágenes está triplicada (ver el render más abajo), así que
    // al recorrer exactamente un set completo (6 imágenes) y volver a
    // 0 no se nota el salto.
    let lastTs = null;

    const tick = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const { step } = getMetrics();
      indexRef.current += (SPEED * dt) / step;
      if (indexRef.current >= projects.length) {
        indexRef.current -= projects.length;
      }

      paint();
      rafRef.current = requestAnimationFrame(tick);
    };

    paint(); // posición inicial, antes del primer fotograma
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.intro}>{children}</div>

      <div className={styles.vector}>
        <img src="/img/vector.webp" alt="visera" />
      </div>

      <div className={styles.images} ref={imagesRef}>
        {[...projects, ...projects, ...projects].map((project, i) => (
          <img
            key={`${project.title}-${i}`}
            className={styles.img}
            src={project.image}
            alt={project.title}
            style={{ objectPosition: project.objectPosition || "center" }}
          />
        ))}
      </div>

      <p className={styles.tagline} data-text="Hacemos brillar tu marca">
        Hacemos brillar tu marca
      </p>
    </div>
  );
};
