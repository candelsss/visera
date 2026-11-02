"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // null = "todavía no sabemos el tema real" (evita parpadeos/mismatches)
  const [theme, setTheme] = useState(null);

  // Al montar, leemos el tema que ya dejó puesto el script del <head>
  // (ver layout.js) para que React y el DOM se pongan de acuerdo.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  // Cada vez que cambia el tema, lo aplicamos al <html> y lo guardamos.
  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return context;
}

// Dispara el efecto "cortina" del fondo del header/toggle: cada vez
// que el tema cambia, sube un contador (tick). Los componentes usan
// ese tick como "key" de React en el span del barrido, así que React
// lo desmonta y monta uno nuevo — y con él, una animación CSS (@keyframes)
// que arranca sola desde cero, sin depender de un requestAnimationFrame
// "a tiempo" (eso se notaba entrecortado si el hilo principal andaba
// ocupado con el resto de transiciones del tema). El color viejo lo
// pone --foreground-prev (ver globals.css); el anchor (con el tema de
// destino) decide la dirección: hacia claro baja (como ponerse la
// visera), hacia oscuro sube (como quitársela).
export function useThemeSweep() {
  const { theme } = useTheme();
  const [tick, setTick] = useState(0);
  const prevTheme = useRef(null);

  useEffect(() => {
    if (!theme) return;
    if (prevTheme.current && prevTheme.current !== theme) {
      setTick((t) => t + 1);
    }
    prevTheme.current = theme;
  }, [theme]);

  return { tick, anchor: theme === "light" ? "top" : "bottom" };
}
