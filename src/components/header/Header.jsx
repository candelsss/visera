"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import styles from "./header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Visera." },
  { href: "/servicios", label: "Servicios" },
  // Equipo: comentado hasta tener el contenido real de esa página.
  // Descomentar esta línea para reactivar el link.
  // { href: "/equipo", label: "Equipo" },
];

export const Header = () => {
  const pathname = usePathname();
  const linkRefs = useRef([]);
  // Posición/ancho de la píldora activa, en píxeles reales dentro del
  // <nav> — se recalcula cada vez que cambia la ruta o el tamaño de
  // ventana, y la transición suave la pone el CSS (transition en .pill).
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const measure = () => {
      const activeIndex = NAV_LINKS.findIndex((l) => l.href === pathname);
      const activeEl = linkRefs.current[activeIndex];
      if (!activeEl) {
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      setPill({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        visible: true,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span
          className={styles.pill}
          style={{
            transform: `translateX(${pill.left}px)`,
            width: `${pill.width}px`,
            opacity: pill.visible ? 1 : 0,
          }}
        />
        {NAV_LINKS.map(({ href, label }, i) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
};
