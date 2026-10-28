import style from "./page.module.css";

export default function Servicios() {
  const servicios = [
    {nombre: 'Estrategia', descripcion: 'Toda buena marca empieza con una buena pregunta.\nNosotros encontramos las respuestas.', servicios: 'Investigación y auditoría, posicionamiento, estrategia de marca, arquitectura de marca, concepto creativo y narrativa de marca.'},
    {nombre: 'Identidad Verbal', descripcion: 'Las marcas también hablan.\nNos aseguramos de que tengan algo que decir.', servicios: 'Naming, tono de voz, storytelling, manifiesto de marca, tagline, sistema verbal, copy creativo y guías de comunicación.'},

    {nombre: 'Identidad Visual', descripcion: 'Construimos sistemas visuales pensados para durar, crecer y ser reconocidos.', servicios: 'Servicios: Identidad visual, dirección de arte, sistemas gráficos, diseño editorial, packaging, ilustración y guías de marca.'},
    {nombre: 'Experiencia de marca', descripcion: 'Las ideas cobran sentido cuando \nlas personas pueden vivirlas.', servicios: 'Dirección creativa, campañas, lanzamientos, activaciones de marca, fotografía, vídeo, motion y producción.'},
    {nombre: 'Digital', descripcion: 'Diseñamos espacios digitales que se sienten como una extensión natural de la marca.', servicios: 'UX/ UI, diseño web, e-commerce, desarrollo web y sistemas de diseño.'},


  ];
  return (
    <>
      {/* Visualmente oculto: no cambia el diseño, pero le dice a
          Google de qué trata la página (cada página necesita un h1). */}
      <h1 className={style.srOnly}>Servicios | Visera</h1>

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
