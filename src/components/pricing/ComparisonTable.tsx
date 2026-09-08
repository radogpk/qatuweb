import { Check, Minus } from "lucide-react";

export function ComparisonTable() {
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
      informativa: "Básico (hasta 10)",
      comercio: "Extenso (hasta 30)",
      reservas: "Extenso (hasta 40)",
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
      informativa: "3 a 5 días",
      comercio: "5 a 7 días",
      reservas: "7 a 10 días",
    },
    {
      feature: "Soporte técnico y cambios menores incluidos",
      informativa: "1 cambio/mes",
      comercio: "2 cambios/mes",
      reservas: "Soporte prioritario",
    },
    {
      feature: "Pago único de Setup (Diseño y Configuración)",
      informativa: "S/ 250",
      comercio: "S/ 450",
      reservas: "S/ 650",
      isPrice: true,
    },
    {
      feature: "Renta mensual (Mantenimiento, hosting y dominio)",
      informativa: "S/ 35 / mes",
      comercio: "S/ 55 / mes",
      reservas: "S/ 75 / mes",
      isPrice: true,
    },
  ];

  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-[#FCF6E5] text-[#D4A017] mx-auto flex items-center justify-center">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      ) : (
        <div className="text-[#4A5B78]/40 flex justify-center">
          <Minus className="w-4 h-4" />
        </div>
      );
    }
    return (
      <span className="font-semibold text-xs sm:text-sm text-[#2B3A55]">
        {val}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8DEC8] shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8DEC8] bg-[#FAF7F2]">
              <th className="p-4 sm:p-6 text-sm font-serif font-bold text-[#2B3A55] min-w-[240px]">
                Característica / Servicio
              </th>
              <th className="p-4 sm:p-6 text-center text-sm font-serif font-bold text-[#2B3A55] min-w-[140px]">
                Web Informativa
              </th>
              <th className="p-4 sm:p-6 text-center text-sm font-serif font-bold text-[#B23A2E] bg-[#FDF0EE]/50 min-w-[140px]">
                Comercio Básico ★
              </th>
              <th className="p-4 sm:p-6 text-center text-sm font-serif font-bold text-[#2B3A55] min-w-[140px]">
                Comercio + Reservas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DEC8] text-xs sm:text-sm">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`hover:bg-[#FAF7F2]/60 transition-colors ${
                  row.isPrice ? "bg-[#FCF6E5]/40 font-semibold" : ""
                }`}
              >
                <td className="p-4 sm:p-5 font-medium text-[#2B3A55]">
                  {row.feature}
                </td>
                <td className="p-4 sm:p-5 text-center text-[#4A5B78]">
                  {renderCell(row.informativa)}
                </td>
                <td className="p-4 sm:p-5 text-center text-[#4A5B78] bg-[#FDF0EE]/20">
                  {renderCell(row.comercio)}
                </td>
                <td className="p-4 sm:p-5 text-center text-[#4A5B78]">
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
