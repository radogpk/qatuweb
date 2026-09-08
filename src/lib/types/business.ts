export type BusinessCategory =
  | "restaurante"
  | "hotel"
  | "tienda"
  | "servicios"
  | "artesania";

export interface Business {
  id: string;
  slug: string;
  name: string;
  subdomain: string; // ej: "lasflores.qatu.pe"
  category: BusinessCategory;
  categoryLabel: string;
  city: string;
  shortDescription: string;
  longDescription?: string;
  logoUrl: string;
  coverUrl: string;
  featured: boolean;
  active: boolean;
  address?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  tags: string[];
}

export interface Lead {
  id?: string;
  fullName: string;
  businessName: string;
  category: string;
  phone: string;
  interestedPlan?: string;
  message?: string;
  createdAt?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  setupPrice: number;
  monthlyPrice: number;
  deliveryDays: string;
  description: string;
  features: string[];
  ctaText: string;
}
