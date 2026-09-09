export type ClassifiedType = "alquiler" | "venta" | "traspaso" | "empleo";

export interface ClassifiedAd {
  id: string;
  title: string;
  type: ClassifiedType;
  typeLabel: string;
  priceNumeric: number;
  priceText: string;
  periodLabel?: string; // e.g., "/ mes", "llave en mano", "pago único"
  conditionTag?: string; // e.g., "Garantía 2x1", "Trato Directo", "Seminuevo"
  location: string;
  zone: string; // e.g. "Centro Histórico", "San Juan Bautista", "Magdalena"
  description: string;
  contactPhone: string;
  contactWhatsapp: string;
  imageUrl: string;
  gallery?: string[];
  publishedAt: string;
  tags: string[];
  specs?: { label: string; value: string }[];
  featured?: boolean;
  urgent?: boolean;
  viewsCount?: number;
}


