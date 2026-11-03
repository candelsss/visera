import { IntroP } from "@/components/hero/Hero";
import style from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Visera | Estudio creativo en Valencia</h1>

      <IntroP>
        Visera es un estudio creativo independiente con la misión de aportar valor real y tangible a las marcas a través de ideas frescas, diseños que conectan y campañas que impactan.
      </IntroP>
      <IntroP>
        Nuestra filosofía hace match con quienes apagan el ruido y quienes se encienden al entrar en contacto con el verdadero significado. Pero, sobre todo, con quienes se atreven a llevar visera.
      </IntroP>
      <IntroP>
        Somos un estudio creativo que nace para hacer brillar tu marca.
      </IntroP>
    </>
  );
}
