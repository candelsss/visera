"use client";

import { useLanguage } from "@/components/language/LanguageProvider";
import { equipo } from "@/content/translations";
import style from "./page.module.css";

const TEAM = [

   {
    name: "Candela Fos Segarra",
    role: "Desarrolladora Web y SEO.",
    bio: "Su trabajo une creatividad, concepto y tecnología para construir ecosistemas digitales que potencian la identidad de las marcas. Desde la experiencia de usuario hasta el desarrollo web, transforma ideas en experiencias digitales intuitivas, funcionales y con personalidad. Actualmente lidera el área digital de Visera Estudio.",
  },
    {
    name: "Érika Ávila Miguel",
    role: "Diseñadora Gráfica y Directora de Arte.",
    bio: "Su trabajo se mueve entre la cultura, la música, la noche y la moda. Especializada en identidad visual y comunicación, desarrolla proyectos que combinan concepto, diseño y una mirada propia. Actualmente lidera la dirección de arte de Visera Estudio.",
  },
  {
    name: "María Lacasta Sanchis",
    role: "Directora Creativa, Copywriter y Storyteller.",
    bio: "Más de 10 años de experiencia entre agencias como Filtro y WAM Ogilvy y proyectos independientes. Especializada en conceptualización, narrativa y estrategia de marca, transforma ideas en cultura. Actualmente dirige la creatividad de Visera Estudio.",
  }

 
];

export default function Equipo() {
  const { lang } = useLanguage();

  return (
    <>
      <h1 className={style.srOnly}>Equipo | Visera</h1>

      <p className={style.pageIntro}>{equipo.pageIntro[lang]}</p>

      {/* TODO (cliente): nombre/rol/bio del equipo, pendientes de
          traducción — de momento se muestran siempre en español. */}
      <div className={style.team}>
        {TEAM.map(({ name, role, bio }) => (
          <div key={name}>
            <p className={style.name}>{name}</p>
            <p className={style.role}>{role}</p>
            <p className={style.bio}>{bio}</p>
          </div>
        ))}
      </div>
    </>
  );
}
