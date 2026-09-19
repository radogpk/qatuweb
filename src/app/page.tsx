import type { Metadata } from "next";
import { MarketingHome } from "@/components/home/MarketingHome";

export const metadata: Metadata = {
  title: "Qatu — Tu marca en una web. Tus pedidos en WhatsApp.",
  description:
    "Creamos la web y el catálogo de tu negocio con pedidos directos a WhatsApp. Diseño acompañado, precios claros y sin comisión de Qatu por venta. Desde Ayacucho, Perú.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <MarketingHome />;
}
