export interface TenantConfig {
  slug: string;
  businessName: string;
  tagline: string;
  rubro: 'calzado' | 'pasteleria' | 'boutique' | 'general';
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
  slug: 'pasteleria-huamanga',
  businessName: 'Pastelería & Café Huamanga',
  tagline: 'Tortas personalizadas, postres finos y café de altura',
  rubro: 'pasteleria',
  whatsappNumber: '51966444333',
  currency: 'S/',
  location: 'Jr. Bellido 180, frente al templo San Francisco, Huamanga',
  paymentMethods: ['Yape', 'Plin', 'Efectivo en tienda'],
  theme: {
    primaryColor: '#854D0E', // Café cálido
    accentColor: '#D97706', // Ámbar miel
  },
  features: {
    enableVariants: true,
    variantLabel: 'Porción / Tamaño',
    requireCustomerAddress: true,
  },
};

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
    nombre: 'Tres Leches de Lúcuma Tradicional',
    descripcion: 'Suave bizcochuelo bañado en salsa de tres leches con lúcuma de valle.',
    precio: 48.0,
    imagen_url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80',
    variantes: ['Personal', 'Familiar (12 porc.)'],
    disponible: true,
    destacado: true,
  },
  {
    id: 'past-3',
    nombre: 'Caja x6 Alfajores de Maicena y Manjar Blanco',
    descripcion: 'Masa suave que se deshace en la boca, relleno abundante de manjar artesanal.',
    precio: 18.0,
    imagen_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    variantes: ['Caja 6 un.', 'Caja 12 un.'],
    disponible: true,
  },
];
