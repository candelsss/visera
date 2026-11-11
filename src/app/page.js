"use client";

import { IntroP } from "@/components/hero/Hero";
import { useLanguage } from "@/components/language/LanguageProvider";
import { home } from "@/content/translations";
import style from "./page.module.css";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Visera | Estudio creativo en Valencia</h1>

      {home[lang].map((paragraph, index) => (
        <IntroP key={index}>{paragraph}</IntroP>
      ))}
    </>
  );
}
