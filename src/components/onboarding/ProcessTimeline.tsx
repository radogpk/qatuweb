export interface ProcessStep {
  title: string;
  description: string;
  outcome: string;
}

const steps: ProcessStep[] = [
  {
    title: "Demostración en vivo con tu nombre",
    description:
      "Te mostramos cómo funciona en tu celular con productos reales de tu rubro antes de que pagues un solo sol. Pruebas la comanda a WhatsApp y el Panel de Bolsillo /admin para apagar agotados en 1 toque.",
    outcome: "Ver para creer (Cero riesgo)",
  },
  {
    title: "Cierre comercial y elección de plan",
    description:
      "Eliges el Plan Anual (S/ 300 con instalación 100% GRATIS) o el Plan Mensual (S/ 30 + S/ 90 de activación inicial). Si requieres funciones avanzadas (Mesas y mozos, Inventario con alertas o Lector DNI), las sumas como pago único.",
    outcome: "Tarifa clara y 0% comisión por venta",
  },
  {
    title: "Pago y validación transparente",
    description:
      "Transfieres vía Yape o Plin al número oficial 941 663 265 (Titular: Luis Gerardo Llocclla Sauñe) y subes tu comprobante en tu portal de autogestión (/dashboard/cliente).",
    outcome: "Comprobante registrado al instante",
  },
  {
    title: "Aprobación en 1-Toque y web lista",
    description:
      "El Super Admin verifica el voucher desde el Command Center (/dashboard/admin), aprueba el pago y el sistema activa tu subdominio seguro (tunegocio.qatuweb.com) en Cloudflare Edge y Supabase en 24 a 48 horas.",
    outcome: "Tu tienda activa y vendiendo en 24-48h",
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
