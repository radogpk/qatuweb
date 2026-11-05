export interface TenantConfig {
  slug: string;
  businessName: string;
  tagline: string;
  rubro:
    | 'calzado'
    | 'pasteleria'
    | 'boutique'
    | 'gastronomia'
    | 'restaurante'
    | 'gym'
    | 'comercio'
    | 'hospedaje'
    | 'general'
    | (string & {});
  whatsappNumber: string; // ej: "51966888777" (sin + ni espacios)
  currency: string;
  location: string;
  paymentMethods: string[];
  theme: {
    primaryColor: string;
    accentColor: string;
    bgBanner?: string;
  };
  features: {
    enableVariants: boolean;
    variantLabel: string; // "Talla", "Sabor", "Medida"
    requireCustomerAddress: boolean;
  };
}

export interface StoreProduct {
  id: string;
  categoria_id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_oferta?: number;
  imagen_url: string;
  variantes: string[]; // ej: ["36", "37", "38", "39", "40"]
  disponible: boolean;
  destacado?: boolean;
}

export interface StoreCategory {
  id: string;
  nombre: string;
  orden?: number;
}

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  variante?: string;
  imagen_url: string;
}

// ==========================================
// PRESETS LISTOS PARA DEMOS EN HUAMANGA
// ==========================================

export const PRESET_CALZADOS: TenantConfig = {
  slug: 'calzados-lucas',
  businessName: 'Calzados Lucas Huamanga',
  tagline: 'Calzado artesanal y urbano en puro cuero ayacuchano',
  rubro: 'calzado',
  whatsappNumber: '51966888777',
  currency: 'S/',
  location: 'Jr. Asamblea 245, Huamanga, Ayacucho',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  theme: {
    primaryColor: '#B23A2E', // Rojo Ayacuchano
    accentColor: '#D4A017', // Dorado Qori
  },
  features: {
    enableVariants: true,
    variantLabel: 'Talla',
    requireCustomerAddress: false,
  },
};

export const MOCK_PRODUCTS_CALZADOS: StoreProduct[] = [
  {
    id: 'prod-1',
    categoria_id: 'cat-1',
    nombre: 'Botín Cuero Caña Alta Artesanal',
    descripcion: 'Puro cuero vacuno de primera, suela antideslizante con costura reforzada.',
    precio: 135.0,
    precio_oferta: 120.0,
    imagen_url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80',
    variantes: ['37', '38', '39', '40', '41'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'prod-2',
    categoria_id: 'cat-2',
    nombre: 'Zapatilla Urbana Blanca Classic',
    descripcion: 'Diseño liviano para uso diario con detalles bordados tradicionales.',
    precio: 95.0,
    precio_oferta: 85.0,
    imagen_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    variantes: ['36', '37', '38', '39', '40'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'prod-3',
    categoria_id: 'cat-1',
    nombre: 'Mocasín Ejecutivo Cuero Café',
    descripcion: 'Elegancia y máxima comodidad para oficina o eventos especiales.',
    precio: 140.0,
    imagen_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41', '42'],
    disponible: true,
  },
  {
    id: 'prod-4',
    categoria_id: 'cat-2',
    nombre: 'Zapatilla Deportiva Trail Runner',
    descripcion: 'Amortiguación de alto impacto y tracción especial.',
    precio: 110.0,
    imagen_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41'],
    disponible: true,
  },
];

export const PRESET_PASTELERIA: TenantConfig = {
  slug: 'lasflores',
  businessName: 'Restaurante & Pastelería Las Flores',
  tagline: 'Carta digital, desayunos tradicionales, tortas finas y café de altura',
  rubro: 'restaurante',
  whatsappNumber: '51966000111',
  currency: 'S/',
  location: 'Jr. Bellido 180, frente al templo San Francisco, Huamanga',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  theme: {
    primaryColor: '#854D0E', // Café cálido
    accentColor: '#D97706', // Ámbar miel
  },
  features: {
    enableVariants: true,
    variantLabel: 'Porción / Presentación',
    requireCustomerAddress: true,
  },
};

export const PRESET_LASFLORES = PRESET_PASTELERIA;

export const MOCK_PRODUCTS_PASTELERIA: StoreProduct[] = [
  {
    id: 'past-1',
    nombre: 'Torta Selva Negra Artesanal',
    descripcion: 'Bizcocho húmedo de cacao cusqueño, crema chantilly y cerezas maceradas.',
    precio: 65.0,
    precio_oferta: 55.0,
    imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    variantes: ['Mediana (10 porc.)', 'Grande (20 porc.)'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'past-2',
    nombre: 'Desayuno Tradicional Huamanguino',
    descripcion: 'Tamal ayacuchano artesanal, pan chapla caliente, chicharrón y café pasado.',
    precio: 25.0,
    precio_oferta: 22.0,
    imagen_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80',
    variantes: ['Con Café Americano', 'Con Café Pasado'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'past-3',
    nombre: 'Tres Leches de Lúcuma Tradicional',
    descripcion: 'Suave bizcochuelo bañado en salsa de tres leches con lúcuma de valle.',
    precio: 48.0,
    imagen_url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80',
    variantes: ['Personal', 'Familiar (12 porc.)'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'past-4',
    nombre: 'Caja x6 Alfajores de Maicena y Manjar Blanco',
    descripcion: 'Masa suave que se deshace en la boca, relleno abundante de manjar artesanal.',
    precio: 18.0,
    imagen_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    variantes: ['Caja 6 un.', 'Caja 12 un.'],
    disponible: true,
  },
];

export const PRESET_TRANKILANDIA: TenantConfig = {
  slug: 'trankilandia',
  businessName: 'Trankilandia Gym & Fitness',
  tagline: 'Fuerza, rendimiento y nutrición deportiva en el centro de Huamanga',
  rubro: 'gym',
  whatsappNumber: '51966000222',
  currency: 'S/',
  location: 'Av. Mariscal Cáceres 540, Huamanga, Ayacucho',
  paymentMethods: ['Yape', 'Plin', 'Efectivo en counter'],
  theme: {
    primaryColor: '#059669', // Verde Esmeralda Operacional
    accentColor: '#10B981',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Modalidad',
    requireCustomerAddress: false,
  },
};

export const MOCK_PRODUCTS_TRANKILANDIA: StoreProduct[] = [
  {
    id: 'gym-1',
    nombre: 'Membresía Mensual Pase Libre',
    descripcion: 'Acceso total a sala de musculación, zona cardiovascular y casillero personal.',
    precio: 80.0,
    precio_oferta: 75.0,
    imagen_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    variantes: ['Turno Mañana (06:00 - 12:00)', 'Turno Libre Completo'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'gym-2',
    nombre: 'Plan Trimestral Disciplina Total',
    descripcion: '3 meses de entrenamiento ilimitado con rutina personalizada y evaluación mensual.',
    precio: 210.0,
    precio_oferta: 195.0,
    imagen_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    variantes: ['Pase Individual', 'Promo Pareja (x2)'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'gym-3',
    nombre: 'Proteína Whey Isolate 2 lbs (Suplemento)',
    descripcion: '25g de proteína pura por porción, rápida absorción para recuperación muscular.',
    precio: 140.0,
    precio_oferta: 130.0,
    imagen_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80',
    variantes: ['Sabor Chocolate Suizo', 'Sabor Vainilla Francesa'],
    disponible: true,
  },
  {
    id: 'gym-4',
    nombre: 'Pase Diario de Entrenamiento',
    descripcion: 'Uso de máquinas y duchas durante 1 sesión completa para visitantes.',
    precio: 10.0,
    imagen_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    variantes: ['Día Completo'],
    disponible: true,
  },
];
