const steps = [
  {
    title: "Conversamos sobre tu negocio.",
    description:
      "Qué vendes, a quién atiendes y qué quieres lograr con tu web. Definimos contigo el plan, el alcance y los materiales que necesitaremos.",
    outcome: "Un punto de partida claro",
  },
  {
    title: "Damos forma a tu página.",
    description:
      "Organizamos tus fotos, textos y precios. Diseñamos la página para celular y configuramos las funciones incluidas en tu plan.",
    outcome: "Tu identidad, lista para la web",
  },
  {
    title: "La revisamos contigo.",
    description:
      "Antes de publicar, revisamos el contenido y probamos los enlaces de contacto y pedidos. Acordamos los ajustes dentro del alcance del proyecto.",
    outcome: "Cada detalle en su sitio",
  },
  {
    title: "Publicamos y te acompañamos.",
    description:
      "Tu web queda disponible en tu subdominio de Qatu. Te ayudamos a compartirla y atendemos el mantenimiento y las actualizaciones de tu plan.",
    outcome: "Un enlace para tus clientes",
  },
];

export function ProcessTimeline() {
  return (
    <ol className="editorial-process">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="editorial-process-number" aria-hidden="true">
            0{index + 1}
          </span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <span className="editorial-process-outcome">{step.outcome}</span>
        </li>
      ))}
    </ol>
  );
}
