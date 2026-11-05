import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  const informativa = initialPricingPlans.find(
    (plan) => plan.id === "informativa",
  )!;
  const comercio = initialPricingPlans.find((plan) => plan.id === "comercio")!;
  const reservas = initialPricingPlans.find((plan) => plan.id === "reservas")!;
  const rows = [
    {
      feature: "Subdominio propio (tunegocio.qatu.pe)",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Hosting cloud ultrarrápido con certificado SSL",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Diseño mobile-first adaptado a tu identidad",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Presencia en el Directorio General Qatu.pe",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Botón de contacto directo a WhatsApp",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Ubicación interactiva en Google Maps y horarios",
      informativa: true,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Catálogo interactivo con precios y fotos",
      informativa: "Presentación informativa",
      comercio: "Extenso (hasta 30)",
      reservas: "Hasta 30 productos",
    },
    {
      feature: "Carrito de compras con pedido ordenado a WhatsApp",
      informativa: false,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Integración visual de cobro con Yape y Plin",
      informativa: false,
      comercio: true,
      reservas: true,
    },
    {
      feature: "Módulo de solicitud de reservas (fechas / personas)",
      informativa: false,
      comercio: false,
      reservas: true,
    },
    {
      feature: "Galería fotográfica de habitaciones / salones",
      informativa: false,
      comercio: false,
      reservas: true,
    },
    {
      feature: "Tiempo estimado de entrega",
      informativa: informativa.deliveryDays,
      comercio: comercio.deliveryDays,
      reservas: reservas.deliveryDays,
    },
    {
      feature: "Soporte técnico y cambios menores incluidos",
      informativa: "Cambios menores cada mes",
      comercio: "Productos y precios cada mes",
      reservas: "Soporte prioritario",
    },
    {
      feature: "Creación de tu web (pago único)",
      informativa: `S/ ${informativa.setupPrice}`,
      comercio: `S/ ${comercio.setupPrice}`,
      reservas: `S/ ${reservas.setupPrice}`,
      isPrice: true,
    },
    {
      feature: "Mensualidad (mantenimiento, hosting y subdominio)",
      informativa: `S/ ${informativa.monthlyPrice} / mes`,
      comercio: `S/ ${comercio.monthlyPrice} / mes`,
      reservas: `S/ ${reservas.monthlyPrice} / mes`,
      isPrice: true,
    },
  ];

  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <Check aria-hidden="true" className="w-3.5 h-3.5 stroke-[3]" />
          <span className="sr-only">Incluido</span>
        </div>
      ) : (
        <div className="text-slate-300 flex justify-center">
          <Minus aria-hidden="true" className="w-4 h-4" />
          <span className="sr-only">No incluido</span>
        </div>
      );
    }
    return (
      <span className="font-bold text-xs sm:text-sm text-slate-900">{val}</span>
    );
  };

  return (
    <div className="relative min-w-0 max-w-full bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div
        className="relative max-w-full overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Comparación de planes: desplaza horizontalmente para ver todas las columnas"
      >
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">
            Funciones y precios de los planes de Qatu
          </caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th
                scope="col"
                className="p-4 sm:p-5 text-sm font-heading font-bold text-slate-900 min-w-[240px]"
              >
                Característica / Servicio
              </th>
              <th
                scope="col"
                className="p-4 sm:p-5 text-center text-sm font-heading font-bold text-slate-800 min-w-[140px]"
              >
                {informativa.name}
              </th>
              <th
                scope="col"
                className="p-4 sm:p-5 text-center text-sm font-heading font-extrabold text-brand-600 bg-brand-50/50 min-w-[140px]"
              >
                {comercio.name}
              </th>
              <th
                scope="col"
                className="p-4 sm:p-5 text-center text-sm font-heading font-bold text-slate-800 min-w-[140px]"
              >
                {reservas.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`hover:bg-slate-50/60 transition-colors ${
                  row.isPrice ? "bg-slate-50 font-bold" : ""
                }`}
              >
                <th
                  scope="row"
                  className="p-4 sm:p-4.5 font-medium text-slate-800"
                >
                  {row.feature}
                </th>
                <td className="p-4 sm:p-4.5 text-center text-slate-600">
                  {renderCell(row.informativa)}
                </td>
                <td className="p-4 sm:p-4.5 text-center text-slate-600 bg-brand-50/20">
                  {renderCell(row.comercio)}
                </td>
                <td className="p-4 sm:p-4.5 text-center text-slate-600">
                  {renderCell(row.reservas)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
