import style from "./page.module.css";

export default function Servicios() {
  const servicios = [
    {
      nombre: "Estrategia",
      descripcion:
        "Toda gran idea empieza con una pregunta.\nNos ponemos la visera para ayudarte a encontrar la respuesta.",
      servicios:
        "investigación y auditoría, posicionamiento, estrategia de marca, arquitectura de marca, concepto creativo y narrativa de marca.",
    },
    {
      nombre: "Identidad Verbal",
      descripcion:
        "Cómo habla tu marca dice mucho.\nLo que dice y el significado que aporta, lo dice todo.",
      servicios:
        "naming, tono de voz, storytelling, manifiesto de marca, tagline, sistema verbal, copy creativo y guías de comunicación.",
    },
    {
      nombre: "Identidad Visual",
      descripcion:
        "Lo reconocemos, nos gusta crear marcas reconocibles.\nDiseñamos ecosistemas visuales con alto potencial de crecimiento.",
      servicios:
        "Identidad visual, dirección de arte, sistemas gráficos, diseño editorial, packaging, ilustración y guías de marca.",
    },
    {
      nombre: "Campañas",
      descripcion:
        "El brillo especial se recuerda. Y, que te recuerden, es brillante.\nPensamos ideas que conectan. Vamos más allá del impacto, creamos cultura.",
      servicios:
        "Dirección creativa, campañas, lanzamientos, fotografía, vídeo, motion, contenido y producción.",
    },
    {
      nombre: "Digital",
      descripcion:
        "Diseñamos espacios digitales donde todo cabe.\nGeneramos experiencias en las que te podrías quedar un rato más.",
      servicios: "UX/UI, diseño web, e-commerce, desarrollo web y sistemas de diseño.",
    },
    {
      nombre: "Eventos",
      descripcion:
        "Lo pensamos. Lo cocinamos. Lo servimos.\nOrganizamos eventos, porque las ideas conectan cuando pasan de verdad.",
      servicios:
        "conceptualización, dirección creativa, identidad visual del evento, diseño de espacios, escenografía, producción, programación, activaciones y dirección artística.",
    },
  ];
  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Servicios | Visera</h1>

      <p className={style.pageIntro}>Formas de hacerte brillar.</p>

      <div className={style["servicios-grid"]}>
        {servicios.map((servicio, index) => (
          <div key={index} className="servicio-item">
            <h2 className={style.name}>{servicio.nombre}</h2>
            <p className={style.description}>{servicio.descripcion}</p>
            <p className={style.services}>Servicios: {servicio.servicios}</p>
          </div>
        ))}
      </div>
    </>
  );
}
