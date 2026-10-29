import { IntroP } from "@/components/hero/Hero";
import style from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Visera | Estudio creativo en Valencia</h1>

      <IntroP>
        Visera es un estudio creativo independiente con la misión de aportar valor real y tangible a través <br/> de ideas frescas, diseños que conectan y campañas que impactan.
      </IntroP>
      <IntroP>
        Siempre en busca de una sensación similar al lujo, y un color parecido al brillo.
      </IntroP>
      <IntroP>
        Nuestra filosofía hace match con quienes se calientan bajo el sol, eligen vivir la vida en chanclas y, sobre todo, <br/> quienes se atreven a llevar visera.
      </IntroP>
      <IntroP>
        Somos un estudio creativo que nace para hacer brillar tu marca.
      </IntroP>
    </>
  );
}
