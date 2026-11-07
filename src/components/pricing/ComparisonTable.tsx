import { OFFICIAL_PRICING_PLANS } from "@/lib/config/pricing";
import { Check, Minus, Sparkles } from "lucide-react";

export function ComparisonTable() {
  const mensual =
    OFFICIAL_PRICING_PLANS.find((plan) => plan.id === "mensual") ||
    OFFICIAL_PRICING_PLANS[0];
  const anual =
    OFFICIAL_PRICING_PLANS.find((plan) => plan.id === "anual") ||
    OFFICIAL_PRICING_PLANS[1];

  const rows: {
    feature: string;
    mensual: boolean | string;
    anual: boolean | string;
    modulos: boolean | string;
    isHighlight?: boolean;
  }[] = [
    {
      feature: "Carga inicial de catálogo (fotos, precios, variantes)",
      mensual: "25 productos incluidos",
      anual: "25 productos incluidos",
      modulos: "Asistencia para carga de carta / inventario",
    },
    {
      feature: "Subdominio seguro (*.qatuweb.com) con SSL en Cloudflare Edge",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Infraestructura aislada en Supabase y base de datos propia",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Panel de Bolsillo (/admin) para apagar agotados en 1 toque",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Comanda digital estructurada a WhatsApp (0% comisiones)",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Compresión WebP automática para fotos de celular (<80 KB)",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Código QR para mostrador o mesas en alta resolución",
      mensual: false,
      anual: "Gratis en Anual",
      modulos: "Incluido en Módulo Mesas",
    },
    {
      feature: "Guardián Anti-Pausa 24/7 con ping de actividad a Supabase",
      mensual: true,
      anual: true,
      modulos: false,
    },
    {
      feature: "Módulo de Carta QR de mesas y mozos",
      mensual: "+S/ 70 (opcional)",
      anual: "+S/ 70 (opcional)",
      modulos: "S/ 70 (pago único)",
    },
    {
      feature: "Módulo de Inventario con alertas automáticas a WhatsApp",
      mensual: "+S/ 90 (opcional)",
      anual: "+S/ 90 (opcional)",
      modulos: "S/ 90 (pago único)",
    },
    {
      feature: "Módulo Lector de DNI / códigos de barras (Gyms y control)",
      mensual: "+S/ 150 (opcional)",
      anual: "+S/ 150 (opcional)",
      modulos: "S/ 150 (pago único)",
    },
    {
      feature: "Tiempo estimado de entrega para salir a vender",
      mensual: mensual.deliveryDays,
      anual: anual.deliveryDays,
      modulos: "Inmediato con tu web",
    },
    {
      feature: "Costo de instalación / alta técnica inicial",
      mensual: `S/ ${mensual.setupPrice} (pago único)`,
      anual: "S/ 0 GRATIS",
      modulos: "Sin costo de alta adicional",
      isHighlight: true,
    },
    {
      feature: "Inversión periódica (mantenimiento y hosting)",
      mensual: `S/ ${mensual.periodicPrice} / mes (${mensual.dailyEquivalent})`,
      anual: `S/ ${anual.periodicPrice} / año (${anual.dailyEquivalent})`,
      modulos: "S/ 0 (No altera cuota mensual)",
      isHighlight: true,
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50/90 text-stone-700">
            <th scope="col" className="py-4 px-5 font-bold w-[34%]">
              Característica
            </th>
            <th scope="col" className="py-4 px-4 text-center border-l border-stone-200 w-[22%]">
              <span className="font-bold block text-stone-900">{mensual.name}</span>
              <span className="text-xs text-stone-500 font-medium">
                S/ {mensual.periodicPrice} / mes
              </span>
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center bg-amber-50/80 border-l-2 border-r-2 border-amber-400/80 w-[24%] relative"
            >
              <div className="mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3" />
                  Recomendado
                </span>
              </div>
              <span className="font-bold block text-stone-950">{anual.name}</span>
              <span className="text-xs text-emerald-800 font-bold">
                S/ {anual.periodicPrice} / año (Setup Gratis)
              </span>
            </th>
            <th scope="col" className="py-4 px-4 text-center border-l border-stone-200 w-[20%]">
              <span className="font-bold block text-stone-900">Módulos Especiales</span>
              <span className="text-xs text-[#B23A2E] font-medium">Pagos Únicos Opcionales</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {rows.map((row) => (
            <tr
              key={row.feature}
              className={`hover:bg-stone-50/70 transition-colors ${
                row.isHighlight ? "bg-amber-50/30 font-semibold" : ""
              }`}
            >
              <th scope="row" className="py-3.5 px-5 font-medium text-stone-800 text-xs sm:text-sm">
                {row.feature}
              </th>
              <td className="py-3.5 px-4 text-center border-l border-stone-100">
                {renderCell(row.mensual)}
              </td>
              <td className="py-3.5 px-4 text-center border-l-2 border-r-2 border-amber-400/60 bg-amber-50/30">
                {renderCell(row.anual, true)}
              </td>
              <td className="py-3.5 px-4 text-center border-l border-stone-100">
                {renderCell(row.modulos)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(value: boolean | string, isFeaturedColumn = false) {
  if (value === true) {
    return <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[2.5]" />;
  }
  if (value === false) {
    return <Minus className="w-4 h-4 text-stone-300 mx-auto" />;
  }
  if (value === "S/ 0 GRATIS" || value === "Gratis en Anual") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
        {value}
      </span>
    );
  }
  return (
    <span
      className={`text-xs ${
        isFeaturedColumn ? "font-bold text-stone-950" : "font-medium text-stone-700"
      }`}
    >
      {value}
    </span>
  );
}
