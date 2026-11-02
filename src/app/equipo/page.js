import { IntroP } from "@/components/hero/Hero";
import style from "./page.module.css";

const TEAM = [
  { name: "Érika Ávila", role: "Diseño gráfico · Dirección de Arte" },
  { name: "Candela Fos", role: "Desarrollo web · Diseño UX/UI · SEO" },
  { name: "María Lacasta", role: "Copywriter · Dirección Creativa" },
];

export default function Equipo() {
  return (
    <>
      <h1 className={style.srOnly}>Equipo | Visera</h1>

      <IntroP>Debajo de la visera:</IntroP>

      {TEAM.map(({ name, role }) => (
        <IntroP key={name}>
          <strong>{name}</strong>
          <br />
          <span className={style.role}>{role}</span>
        </IntroP>
      ))}
    </>
  );
}
