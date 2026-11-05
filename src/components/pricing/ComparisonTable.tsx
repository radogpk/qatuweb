import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
  const mensual =
    initialPricingPlans.find((plan) => plan.id === "mensual") ||
    initialPricingPlans[0];
  const anual =
    initialPricingPlans.find((plan) => plan.id === "anual") ||
    initialPricingPlans[1];
  const medida =
    initialPricingPlans.find((plan) => plan.id === "medida") ||
    initialPricingPlans[2];

  const rows = [
    {
      feature: "Subdominio oficial (tunegocio.qatuweb.com)",
      mensual: true,
      anual: true,
      medida: "Subdominio o dominio propio",
    },
    {
      feature: "Alojamiento en la nube ultrarrápido con SSL",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Diseño móvil adaptado a tu identidad de marca",
      mensual: true,
      anual: true,
      medida: "Diseño 100% a medida",
    },
    {
      feature: "Catálogo móvil con variantes (tallas, sabores, colores)",
      mensual: "Hasta 25 productos",
      anual: "Hasta 50 productos",
      medida: "Ilimitado según base de datos",
    },
    {
      feature: "Carrito flotante y comanda estructurada a WhatsApp",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Cobro directo con Yape, Plin y Efectivo (0% comisiones)",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Panel de Bolsillo (/admin) para apagar agotados",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Compresión WebP automática para fotos de cámara (<80 KB)",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Generación de código QR para mostrador en alta resolución",
      mensual: false,
      anual: true,
      medida: true,
    },
    {
      feature: "Guardián Anti-Pausa 24/7 con ping diario a Supabase",
      mensual: true,
      anual: true,
      medida: true,
    },
    {
      feature: "Control por DNI con código de barras o caja diaria",
      mensual: false,
      anual: false,
      medida: "Incluido (Gyms / Control)",
    },
    {
      feature: "Tiempo estimado de entrega",
      mensual: mensual.deliveryDays,
      anual: anual.deliveryDays,
      medida: medida.deliveryDays,
    },
    {
      feature: "Costo de activación / instalación inicial",
      mensual: `S/ ${mensual.setupPrice}`,
      anual: "S/ 0 (GRATIS)",
      medida: `Desde S/ ${medida.setupPrice}`,
      isPrice: true,
    },
    {
      feature: "Inversión periódica (mantenimiento y soporte)",
      mensual: `S/ ${mensual.monthlyPrice} / mes`,
      anual: `S/ 300 / año (S/ 25/mes)`,
      medida: `S/ ${medida.monthlyPrice} / mes`,
      isPrice: true,
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
      <table className="w-full min-w-[680px] interior-table">
        <thead>
          <tr>
            <th scope="col">Característica</th>
            <th scope="col">
              <span>{mensual.name}</span>
              <small>S/ {mensual.monthlyPrice} / mes</small>
            </th>
            <th className="interior-th-featured" scope="col">
              <div className="mb-1.5">
                <span className="interior-table-badge">Recomendado</span>
              </div>
              <span className="block font-bold">{anual.name}</span>
              <small>S/ 300 / año (Setup Gratis)</small>
            </th>
            <th scope="col">
              <span>{medida.name}</span>
              <small>Lógica personalizada</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <th scope="row">{row.feature}</th>
              <td>{renderCell(row.mensual)}</td>
              <td className="interior-td-featured">{renderCell(row.anual)}</td>
              <td>{renderCell(row.medida)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(value: boolean | string) {
  if (value === true) {
    return <Check className="text-emerald-600 mx-auto" size={17} />;
  }
  if (value === false) {
    return <Minus className="text-stone-300 mx-auto" size={17} />;
  }
  return <span className="font-semibold text-xs text-stone-800">{value}</span>;
}
