"use client";

import { useLanguage } from "@/components/language/LanguageProvider";
import { servicios } from "@/content/translations";
import style from "./page.module.css";

export default function Servicios() {
  const { lang } = useLanguage();

  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Servicios | Visera</h1>

      {/* <p className={style.pageIntro}>{servicios.pageIntro[lang]}</p> */}

      <div className={style["servicios-grid"]}>
        {servicios.items.map((servicio, index) => {
          const [description, subDescription] = servicio.descripcion[lang].split("\n");
          return (
            <div key={index} className="servicio-item">
              <h2 className={style.name}>{servicio.nombre[lang]}</h2>
              <p className={style.description}>{description}</p>
              {subDescription && <p className={style.subDescription}>{subDescription}</p>}
              <p className={style.services}>
                {servicios.servicesLabel[lang]}: {servicio.servicios[lang]}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
