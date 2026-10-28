import { IntroP } from "@/components/hero/Hero";
import style from "./page.module.css";

// TODO (cliente): contenido real del equipo — quién sois, roles,
// lo que querías contar aquí. De momento es un texto de relleno
// para que la página y el link del header ya funcionen.
export default function Equipo() {
  return (
    <>
      <h1 className={style.srOnly}>Equipo | Visera</h1>

      <IntroP>
        Somos el equipo detrás de Visera — texto pendiente de contenido real.
      </IntroP>
    </>
  );
}
