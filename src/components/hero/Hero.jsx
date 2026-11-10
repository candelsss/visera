"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./hero.module.css";

const projects = [
  {
    title: "",
    image: "/img/visera-project-1.png",
  },
  {
    title: "Spanish Mafia",
    image: "/img/visera-project-2.png",
  },
  {
    title: "una vioska.",
    image: "/img/visera-project-3.png",
  },
  {
    title: "La Mesita",
    image: "/img/visera-project-4.png",
  },
  {
    title: "LITERAL",
    image: "/img/visera-project-5.png",
  },
  {
    title: "una vioska",
    image: "/img/visera-project-6.png",
  },

  {
    title: "una vioska. 2",
    image: "/img/visera-project-7.png",
  },
];

const SPEED = 45; // px/s del carrusel automático (claro y oscuro)

export const IntroP = ({ children }) => (
  <p className={styles.introP}>{children}</p>
);

export const Hero = ({ children }) => {
  const pathname = usePathname();
  // En Equipo el slider sube arriba y el texto baja debajo — se cruzan
  // (ver hero.module.css .teamMode). El slider sigue anclado por el
  // lado fijo (arriba aquí, abajo en el resto) para que el cambio de
  // tamaño claro/oscuro de las imágenes crezca siempre hacia el lado
  // libre, nunca tape el header ni se solape "hacia atrás".
  const isTeam = pathname === "/equipo";
  const imagesRef = useRef(null);
  const introRef = useRef(null);
  // Posición continua del carrusel, en "número de imagen" (ej. 3.4 =
  // un 40% entre la imagen 3 y la 4) — NO en píxeles. Así, al cambiar
  // de tema (donde el tamaño de cada imagen cambia mucho), la posición
  // relativa dentro de la secuencia se conserva exacta; solo cambia
  // cuántos píxeles ocupa cada unidad de índice.
  const indexRef = useRef(0);
  const rafRef = useRef(null);

  // .intro no se desmonta al navegar (solo cambia el children dentro),
  // así que conserva el scroll de la página anterior — sin esto, si
  // venías desplazado hacia abajo en Equipo, la siguiente página podía
  // "arrancar" a mitad de su propio texto en vez de desde el principio.
  useEffect(() => {
    introRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const el = imagesRef.current;
    if (!el) return;

    // imgWidth/step se cachean aquí y solo se recalculan cuando el
    // tamaño realmente cambia (ResizeObserver), NUNCA en cada frame:
    // getBoundingClientRect/getComputedStyle fuerzan un recálculo de
    // layout síncrono, y haciéndolo 60+ veces por segundo para
    // siempre se nota tanto en el scroll táctil del móvil (el hilo
    // principal no tiene hueco para atenderlo) como en otras
    // transiciones CSS que dependen de las mismas variables (se podían
    // quedar congeladas a medio camino al cambiar de tema).
    const metrics = { imgWidth: 0, step: 0 };

    const updateMetrics = () => {
      const first = el.children[0];
      if (!first) return;
      const imgWidth = first.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      metrics.imgWidth = imgWidth;
      metrics.step = imgWidth + gap;
      paint();
    };

    const paint = () => {
      if (!metrics.step) return;
      // Se centra siempre sobre la copia del MEDIO de las tres que se
      // renderizan (ver más abajo), nunca sobre la primera: así hay
      // siempre una copia entera de sobra a cada lado, y no se ve
      // ningún hueco vacío al principio ni cada vez que da la vuelta.
      const displayIndex = projects.length + indexRef.current;
      const offset =
        el.clientWidth / 2 - metrics.imgWidth / 2 - displayIndex * metrics.step;
      el.style.transform = `translateX(${offset}px)`;
    };

    // --- Arrastre (dedo o ratón), con inercia -------------------------
    // Un único "velocityRef" (px/s) gobierna el movimiento siempre: en
    // reposo vale SPEED (el autoplay normal). Al arrastrar, se ignora
    // y la posición sigue al puntero 1:1. Al soltar, se fija a la
    // velocidad real del gesto (fuerte si se empuja fuerte) y cada
    // frame se acerca un poco más a SPEED — así no hay un "párate" y
    // "arranca" distintos, todo es la misma curva continua.
    const velocityRef = { current: SPEED };
    const DECAY_RATE = 2.5; // cuanto más alto, antes vuelve a la velocidad normal
    const DIRECTION_LOCK_PX = 6; // umbral para decidir "esto es horizontal"

    let dragging = false; // ya se confirmó que el gesto es horizontal
    let locked = false; // ya se decidió horizontal/vertical (true en ambos casos)
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastT = 0;

    const onPointerDown = (e) => {
      if (pointerId != null) return; // ya hay un dedo/puntero activo
      pointerId = e.pointerId;
      dragging = false;
      locked = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      lastT = performance.now();
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;

      if (!locked) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) < DIRECTION_LOCK_PX && Math.abs(dy) < DIRECTION_LOCK_PX) {
          return; // todavía no está claro hacia dónde va el gesto
        }
        locked = true;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Es horizontal: lo reclama el carrusel.
          dragging = true;
          try {
            el.setPointerCapture(pointerId);
          } catch {}
          el.style.cursor = "grabbing";
        }
        // Si es vertical, no hacemos nada más: que el scroll de la
        // página (detrás) lo gestione el navegador con normalidad.
      }

      if (!dragging) return;
      e.preventDefault();

      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(1, now - lastT) / 1000;
      lastX = e.clientX;
      lastT = now;

      if (metrics.step) {
        indexRef.current -= dx / metrics.step;
        paint();
      }
      // Velocidad instantánea del gesto, suavizada un poco para que un
      // único frame con ruido no decida solo la inercia final.
      const instant = -dx / dt;
      velocityRef.current = velocityRef.current * 0.7 + instant * 0.3;
    };

    const endDrag = (e) => {
      if (e.pointerId !== pointerId) return;
      if (dragging) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
        el.style.cursor = "grab";
      }
      pointerId = null;
      dragging = false;
      locked = false;
      // velocityRef.current ya trae la velocidad del último gesto — el
      // tick de abajo la acerca solo, con el tiempo, a SPEED otra vez.
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    // Carrusel automático e infinito, en claro y en oscuro. La lista
    // de imágenes está triplicada (ver el render más abajo), así que
    // al recorrer exactamente un set completo (6 imágenes) y volver a
    // 0 no se nota el salto.
    let lastTs = null;

    const tick = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (metrics.step) {
        if (!dragging) {
          // Acerca la velocidad actual (la del empujón, si lo hubo) a
          // la velocidad normal del autoplay — cuanto más fuerte se
          // soltó, más tarda en asentarse, pero siempre de forma
          // continua, nunca con un salto.
          velocityRef.current =
            SPEED + (velocityRef.current - SPEED) * Math.exp(-dt * DECAY_RATE);
          indexRef.current += (velocityRef.current * dt) / metrics.step;
        }
        if (indexRef.current >= projects.length) {
          indexRef.current -= projects.length;
        } else if (indexRef.current < 0) {
          indexRef.current += projects.length;
        }
        paint();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    // ResizeObserver: recalcula cuando cambia el tamaño real de la
    // imagen (resize de ventana, o el propio --img-h al cambiar de
    // tema/página, que anima width/height con transición).
    const ro = new ResizeObserver(updateMetrics);
    ro.observe(el.children[0]);

    updateMetrics(); // posición inicial, antes del primer fotograma
    el.style.cursor = "grab";
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div className={`${styles.page} ${isTeam ? styles.teamMode : ""}`}>
      <div className={styles.intro} ref={introRef}>{children}</div>

      {/* Vector de fondo desactivado de momento — descomentar para volver a mostrarlo.
      <div className={styles.vector}>
        <img src="/img/vector.webp" alt="visera" width={1997} height={1031} />
      </div>
      */}

      <div className={styles.images} ref={imagesRef}>
        {[...projects, ...projects, ...projects].map((project, i) => (
          <div key={`${project.title}-${i}`} className={styles.imagesContainer}>
            <img
              className={styles.img}
              src={project.image}
              alt={project.title}
              width={303}
              height={512}
              draggable={false}
              style={{ objectPosition: project.objectPosition || "center" }}
            />
          </div>
        ))}
      </div>

      <p className={styles.tagline} data-text="Hacemos brillar tu marca">
        Hacemos brillar tu marca
      </p>
    </div>
  );
};
