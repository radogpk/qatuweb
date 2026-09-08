export type ClassifiedType = "alquiler" | "venta" | "traspaso" | "empleo";

export interface ClassifiedAd {
  id: string;
  title: string;
  type: ClassifiedType;
  typeLabel: string;
  priceText: string;
  location: string;
  description: string;
  contactPhone: string;
  contactWhatsapp: string;
  imageUrl?: string;
  publishedAt: string;
  tags: string[];
}
