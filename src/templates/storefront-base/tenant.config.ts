export interface TenantTheme {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  headerBgColor?: string;
  headerTextColor?: string;
  isDarkMode?: boolean;
  fontHeading?: 'font-sans' | 'font-serif' | 'font-mono' | 'font-display';
}

export interface TenantHero {
  title: string;
  highlightText?: string;
  subtitle: string;
  ctaText: string;
  bannerUrl: string;
  badge?: string;
}

export interface TenantStatusBadge {
  text: string;
  subtext?: string;
  isLive: boolean;
}

export interface StoreCategory {
  id: string;
  name: string;
  iconName?: 'tag' | 'flame' | 'coffee' | 'dumbbell' | 'sparkles' | 'glass' | 'cake' | 'box';
}

export interface ProductVariantAcabado {
  name: string;
  colorHex: string;
}

export interface StoreProduct {
  id: string;
  categoria_id?: string;
  codigo?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_oferta?: number;
  imagen_url: string;
  variantes: string[];
  acabados?: ProductVariantAcabado[];
  disponible: boolean;
  destacado?: boolean;
  badge?: string;
  rating?: { score: number; reviewsCount: number };
  specs?: Record<string, string>;
  portionOptions?: Array<{ label: string; price: number; detail?: string }>;
}

export interface CartCustomizationDetails {
  guarnicion?: string;
  salsas?: string[];
  dedicatoria?: string;
  velas?: string;
  fechaCelebracion?: string;
  horaRecojo?: string;
  dni?: string;
  turno?: string;
  subtono?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  variante?: string;
  acabado?: string;
  detallesPersonalizados?: CartCustomizationDetails;
  imagen_url: string;
}

export interface TenantConfig {
  slug: string;
  businessName: string;
  tagline: string;
  subTagline?: string;
  rubro:
    | 'calzado'
    | 'pasteleria'
    | 'polleria'
    | 'restaurante'
    | 'gym'
    | 'belleza'
    | 'licoreria'
    | 'comercio'
    | 'general'
    | (string & {});
  whatsappNumber: string;
  currency: string;
  location: string;
  pickupAddress?: string;
  paymentMethods: string[];
  statusBadge: TenantStatusBadge;
  hero: TenantHero;
  categories: StoreCategory[];
  theme: TenantTheme;
  features: {
    enableVariants: boolean;
    variantLabel: string;
    requireCustomerAddress: boolean;
    customizationType: 'shoes' | 'cake' | 'rotisserie' | 'gym' | 'beauty' | 'liquor' | 'none';
  };
}

// =========================================================================
// 01. PRESET CALZADO: CALZADO & CUERO
// Basado exactamente en imagen media_1794682914347_9588dc69.jpg
// Paleta: #FAF8F5 (Fondo), #121212 (Carbón), #B91C1C (Rojo Carmín), #A5A29D
// Tipografía: Bebas Neue / Grotesque condensada + Inter + Mono
// =========================================================================

export const PRESET_CALZADOS: TenantConfig = {
  slug: 'calzados',
  businessName: 'CALZADO & SNEAKERS',
  tagline: 'Calzado urbano contemporáneo y botines en puro cuero artesanal ayacuchano',
  subTagline: 'CALZADO URBANO • HECHO EN HUAMANGA',
  rubro: 'calzado',
  whatsappNumber: '51966888777',
  currency: 'S/',
  location: 'Jr. Asamblea 245, Huamanga, Ayacucho',
  pickupAddress: 'Jr. Asamblea 245, Huamanga, Ayacucho',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'TALLER ACTIVO • HUAMANGA',
    subtext: 'Envíos en el día y a todo el Perú',
    isLive: true,
  },
  hero: {
    title: 'PISAR CON IDENTIDAD.',
    highlightText: 'HECHO EN HUAMANGA',
    subtitle: 'Calzado urbano y artesanal confeccionado con cuero vacuno seleccionado a mano por maestros zapateros de la región.',
    ctaText: 'EXPLORAR COLECCIÓN ↗',
    bannerUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop&q=80',
    badge: 'COLECCIÓN 2026',
  },
  categories: [
    { id: 'cat-all', name: 'TODOS', iconName: 'box' },
    { id: 'cat-sneakers', name: 'SNEAKERS (12)', iconName: 'box' },
    { id: 'cat-cuero', name: 'CUERO (8)', iconName: 'box' },
    { id: 'cat-mocasines', name: 'MOCASINES', iconName: 'box' },
    { id: 'cat-ofertas', name: 'OFERTAS', iconName: 'tag' },
  ],
  theme: {
    primaryColor: '#B91C1C',
    accentColor: '#121212',
    bgColor: '#FAF8F5',
    cardBgColor: '#FFFFFF',
    textColor: '#121212',
    headerBgColor: '#FAF8F5',
    headerTextColor: '#121212',
    isDarkMode: false,
    fontHeading: 'font-display',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Talla',
    requireCustomerAddress: false,
    customizationType: 'shoes',
  },
};

export const MOCK_PRODUCTS_CALZADOS: StoreProduct[] = [
  {
    id: 'calz-1',
    categoria_id: 'cat-cuero',
    codigo: 'LFH-BT01',
    nombre: 'Botín Andino 01',
    descripcion: 'Puro cuero vacuno curtido al natural, costura reforzada y suela dentada de tracción.',
    precio: 289.0,
    imagen_url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41'],
    acabados: [
      { name: 'Negro', colorHex: '#121212' },
      { name: 'Tabaco', colorHex: '#78350F' },
      { name: 'Miel', colorHex: '#D97706' },
    ],
    disponible: true,
    destacado: true,
    badge: 'DESTACADO',
    rating: { score: 4.9, reviewsCount: 148 },
  },
  {
    id: 'calz-2',
    categoria_id: 'cat-sneakers',
    codigo: 'LFH-SN01',
    nombre: 'Sneaker Piedra',
    descripcion: 'Gamuza premium y cuero suave, forro textil transpirable y plantilla ergonómica de alto impacto.',
    precio: 219.0,
    imagen_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41'],
    acabados: [
      { name: 'Gris Piedra', colorHex: '#52525B' },
      { name: 'Blanco', colorHex: '#F4F4F5' },
    ],
    disponible: true,
    destacado: true,
    badge: 'DESTACADO',
    rating: { score: 4.8, reviewsCount: 112 },
  },
  {
    id: 'calz-3',
    categoria_id: 'cat-sneakers',
    codigo: 'LFH-SN02',
    nombre: 'Sneaker Caliza',
    descripcion: 'Zapatilla urbana de perfil bajo con perforado lateral y suela de caucho vulcanizado.',
    precio: 199.0,
    imagen_url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 86 },
  },
  {
    id: 'calz-4',
    categoria_id: 'cat-mocasines',
    codigo: 'LFH-MC01',
    nombre: 'Mocasín Ejecutivo',
    descripcion: 'Cuero napa lustrable sin pasadores para ocasiones formales y oficina.',
    precio: 240.0,
    imagen_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
    variantes: ['39', '40', '41', '42'],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 54 },
  },
];

// =========================================================================
// 02. PRESET PASTELERÍA: PASTELERÍA & CAFÉ
// Basado en imagen media_1794683066118_51f7ceaa.jpg
// Paleta: #FAF7F2 (Marfil), #291508 (Espresso), #A46A3F (Canela), #D8CDC0 (Piedra)
// Tipografía: Serif Editorial + Sans UI + Mono
// =========================================================================

export const PRESET_PASTELERIA: TenantConfig = {
  slug: 'pasteleria',
  businessName: 'PASTELERÍA & CAFÉ',
  tagline: 'Tortas finas de celebración, desayunos tradicionales y café de especialidad',
  subTagline: 'REPOSTERÍA DE AUTOR • HUAMANGA',
  rubro: 'pasteleria',
  whatsappNumber: '51966000111',
  currency: 'S/',
  location: 'Jr. Bellido 180, San Francisco, Huamanga',
  pickupAddress: 'Jr. Bellido 180, frente a San Francisco',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'HORNEADO HOY',
    subtext: 'Pedidos en el día y reservas anticipadas',
    isLive: true,
  },
  hero: {
    title: 'DULCES MOMENTOS,',
    highlightText: 'HECHOS AQUÍ.',
    subtitle: 'Elaboración diaria con cacao fino de aroma, frutos andinos frescos y horneado artesanal tradicional.',
    ctaText: 'DESCUBRIR LA CARTA ↗',
    bannerUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80',
    badge: 'CARTA DEL DÍA',
  },
  categories: [
    { id: 'cat-all', name: 'Inicio', iconName: 'cake' },
    { id: 'cat-tortas', name: 'Tortas de Celebración', iconName: 'cake' },
    { id: 'cat-porciones', name: 'Porciones del Día', iconName: 'cake' },
    { id: 'cat-desayunos', name: 'Desayunos Huamanguinos', iconName: 'coffee' },
    { id: 'cat-cafe', name: 'Café de Especialidad', iconName: 'coffee' },
  ],
  theme: {
    primaryColor: '#291508',
    accentColor: '#A46A3F',
    bgColor: '#FAF7F2',
    cardBgColor: '#FFFFFF',
    textColor: '#291508',
    headerBgColor: '#FAF7F2',
    headerTextColor: '#291508',
    isDarkMode: false,
    fontHeading: 'font-serif',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Tamaño / Porciones',
    requireCustomerAddress: true,
    customizationType: 'cake',
  },
};

export const MOCK_PRODUCTS_PASTELERIA: StoreProduct[] = [
  {
    id: 'past-1',
    categoria_id: 'cat-tortas',
    nombre: 'Selva Negra Clásica',
    descripcion: 'Bizcocho húmedo de cacao cusqueño, crema chantilly fresca y cerezas andinas maceradas.',
    precio: 85.0,
    imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    variantes: ['Personal', 'Mediana 10p', 'Familiar 20p'],
    portionOptions: [
      { label: 'Personal', price: 35.0, detail: '2 a 4 porciones' },
      { label: 'Mediana 10p', price: 85.0, detail: '10 a 12 porciones' },
      { label: 'Familiar 20p', price: 125.0, detail: '20 porciones' },
    ],
    disponible: true,
    destacado: true,
    badge: 'TORTA CLÁSICA',
    rating: { score: 5.0, reviewsCount: 230 },
  },
  {
    id: 'past-2',
    categoria_id: 'cat-porciones',
    nombre: 'Porción del Día: Torta de Zanahoria',
    descripcion: 'Masa suave de zanahoria con nueces tostadas y cobertura de queso crema.',
    precio: 12.0,
    imagen_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&auto=format&fit=crop&q=80',
    variantes: ['Porción Individual'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 94 },
  },
  {
    id: 'past-3',
    categoria_id: 'cat-desayunos',
    nombre: 'Desayuno Huamanguino Clásico de la Casa',
    descripcion: 'Tamalito ayacuchano en hoja de plátano, chicharrón crocante de panceta, pan chapla caliente y café pasado.',
    precio: 24.0,
    imagen_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80',
    variantes: ['Con Café Pasado', 'Con Té de Hierbas'],
    disponible: true,
    destacado: true,
    rating: { score: 4.9, reviewsCount: 195 },
  },
  {
    id: 'past-4',
    categoria_id: 'cat-cafe',
    nombre: 'Café Cappuccino Doble',
    descripcion: 'Doble shot de espresso de grano arábica con leche emulsionada cremosa.',
    precio: 9.5,
    imagen_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Normal', 'Deslactosada'],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 160 },
  },
];

// =========================================================================
// 03. PRESET POLLERÍA: POLLERÍA & PARRILLAS
// Basado en imagen media_1794683468652_b5725b07.jpg
// Paleta: #0E0D0B (Carbón), #F59E0B (Ámbar), #F5EFE6 (Blanco Cálido)
// Tipografía: Condensed Display + UI Sans + Mono
// =========================================================================

export const PRESET_DON_BRASAS: TenantConfig = {
  slug: 'polleria',
  businessName: 'POLLERÍA & PARRILLAS',
  tagline: 'Pollería a la brasa al carbón, parrillas y combos familiares con despacho inmediato',
  subTagline: 'PLATAFORMA DE PEDIDOS • HUAMANGA',
  rubro: 'polleria',
  whatsappNumber: '51966555444',
  currency: 'S/',
  location: 'Av. Los Próceres 310, Huamanga, Ayacucho',
  pickupAddress: 'Av. Los Próceres 310, Huamanga',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'HORNO A LA BRASA ACTIVO',
    subtext: 'Tiempo estimado 25 min',
    isLive: true,
  },
  hero: {
    title: 'EL SABOR DE LA BRASA.',
    highlightText: 'SIN ESPERAR.',
    subtitle: 'Combos para compartir. Pollo entero al carbón de leña con papas nativas crocantes y salsas artesanales preparados al momento.',
    ctaText: 'VER COMBOS →',
    bannerUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&auto=format&fit=crop&q=80',
    badge: 'DESPACHO EN EL DÍA',
  },
  categories: [
    { id: 'cat-all', name: 'Pollos', iconName: 'flame' },
    { id: 'cat-parrillas', name: 'Parrillas', iconName: 'flame' },
    { id: 'cat-combos', name: 'Combos', iconName: 'flame' },
    { id: 'cat-bebidas', name: 'Bebidas', iconName: 'box' },
  ],
  theme: {
    primaryColor: '#F59E0B',
    accentColor: '#A62920',
    bgColor: '#0E0D0B',
    cardBgColor: '#171614',
    textColor: '#F5EFE6',
    headerBgColor: '#0E0D0B',
    headerTextColor: '#F5EFE6',
    isDarkMode: true,
    fontHeading: 'font-display',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Porción',
    requireCustomerAddress: true,
    customizationType: 'rotisserie',
  },
};

export const MOCK_PRODUCTS_DON_BRASAS: StoreProduct[] = [
  {
    id: 'bras-1',
    categoria_id: 'cat-combos',
    codigo: 'COMBO-01',
    nombre: 'Combo Brasero Familiar',
    descripcion: '1 pollo entero a la brasa + papas nativas crocantes + 3 salsas artesanales (Ají pollero, Mayonesa, Chimichurri).',
    precio: 68.0,
    imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    variantes: ['Papas nativas', 'Papas tradicionales'],
    disponible: true,
    destacado: true,
    badge: 'COMBO RECOMENDADO',
    rating: { score: 4.9, reviewsCount: 310 },
  },
  {
    id: 'bras-2',
    categoria_id: 'cat-all',
    codigo: 'POLLO-1/4',
    nombre: '1/4 Pollo a la Brasa',
    descripcion: 'Pechuga o pierna con papas fritas y cremas artesanales.',
    precio: 22.0,
    imagen_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    variantes: ['1/4', '1/2', '1 Pollo'],
    portionOptions: [
      { label: '1/4 Pollo', price: 22.0, detail: 'Pechuga o pierna' },
      { label: '1/2 Pollo', price: 39.0, detail: 'Medio pollo' },
      { label: '1 Pollo', price: 68.0, detail: 'Pollo entero' },
    ],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 220 },
  },
  {
    id: 'bras-3',
    categoria_id: 'cat-all',
    codigo: 'POLLO-1/2',
    nombre: '1/2 Pollo a la Brasa',
    descripcion: 'Medio pollo dorado a la brasa con papas crocantes y ensalada.',
    precio: 39.0,
    imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    variantes: ['Papas tradicionales', 'Papas nativas'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 140 },
  },
  {
    id: 'bras-4',
    categoria_id: 'cat-all',
    codigo: 'POLLO-1',
    nombre: '1 Pollo a la Brasa Entero',
    descripcion: 'Pollo entero a la brasa con papas y ensalada clásica familiar.',
    precio: 68.0,
    imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    variantes: ['Papas tradicionales', 'Papas nativas'],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 280 },
  },
];

// =========================================================================
// 04. PRESET GYM: GYM & FITNESS
// Basado en imagen media_1794683569158_6816c66a.jpg
// Paleta: #0A0C10 (Obsidian), #10B981 (Cyber Lime), #F5F7FA, #64748B
// Tipografía: Condensed Display + UI Sans + Mono Data
// =========================================================================

export const PRESET_TRANKILANDIA: TenantConfig = {
  slug: 'gym',
  businessName: 'GYM & FITNESS',
  tagline: 'Membresías de acceso libre, entrenamiento de fuerza y nutrición deportiva comprobada',
  subTagline: 'PLATAFORMA DE MEMBRESÍAS • REGISTRO DE SOCIOS',
  rubro: 'gym',
  whatsappNumber: '51966000222',
  currency: 'S/',
  location: 'Av. Mariscal Cáceres 540, Huamanga, Ayacucho',
  pickupAddress: 'Av. Mariscal Cáceres 540, Huamanga',
  paymentMethods: ['Yape', 'Plin', 'Efectivo en recepción'],
  statusBadge: {
    text: 'AFORO EN VIVO: 32 / 60',
    subtext: 'Horario hoy: 06:00 - 22:00',
    isLive: true,
  },
  hero: {
    title: 'ENTRENA CON PROPÓSITO.',
    highlightText: 'PROGRESO MEDIBLE.',
    subtitle: 'Fuerza, constancia y rendimiento físico en sala de musculación completa y área cardiovascular.',
    ctaText: 'VER MEMBRESÍAS ↗',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    badge: 'SEDE CENTRAL HUAMANGA',
  },
  categories: [
    { id: 'cat-all', name: 'Inicio', iconName: 'dumbbell' },
    { id: 'cat-membresias', name: 'Membresías', iconName: 'dumbbell' },
    { id: 'cat-suplementos', name: 'Suplementos', iconName: 'box' },
    { id: 'cat-horarios', name: 'Horarios', iconName: 'box' },
  ],
  theme: {
    primaryColor: '#10B981',
    accentColor: '#059669',
    bgColor: '#0A0C10',
    cardBgColor: '#111827',
    textColor: '#F5F7FA',
    headerBgColor: '#0A0C10',
    headerTextColor: '#F5F7FA',
    isDarkMode: true,
    fontHeading: 'font-display',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Turno / Sabor',
    requireCustomerAddress: false,
    customizationType: 'gym',
  },
};

export const MOCK_PRODUCTS_TRANKILANDIA: StoreProduct[] = [
  {
    id: 'gym-plan-1',
    categoria_id: 'cat-membresias',
    codigo: 'PASE-DIA',
    nombre: 'Pase Diario',
    descripcion: 'Acceso por 1 día a sala de máquinas y vestidores.',
    precio: 10.0,
    imagen_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    variantes: ['Día Completo'],
    disponible: true,
    specs: {
      'Acceso': 'Por 1 día',
      'Uso': 'Máquinas y duchas',
      'Ingreso': 'Libre',
    },
  },
  {
    id: 'gym-plan-2',
    categoria_id: 'cat-membresias',
    codigo: 'MEM-MES',
    nombre: 'Mensual Libre',
    descripcion: 'Acceso ilimitado por 30 días, pesas, cardio y casillero incluido.',
    precio: 75.0,
    imagen_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    variantes: ['Mañana (06:00-12:00)', 'Tarde (12:00-17:00)', 'Noche (17:00-22:00)'],
    disponible: true,
    destacado: true,
    badge: 'MÁS VENDIDO',
    specs: {
      'Acceso': '30 días ilimitados',
      'Área': 'Pesas y cardio',
      'Casillero': 'Incluido',
    },
  },
  {
    id: 'gym-plan-3',
    categoria_id: 'cat-membresias',
    codigo: 'MEM-TRIM',
    nombre: 'Trimestre Pro',
    descripcion: 'Acceso ilimitado por 90 días con evaluación de progreso mensual.',
    precio: 195.0,
    imagen_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Individual', 'Parejas'],
    disponible: true,
    specs: {
      'Acceso': '90 días ilimitados',
      'Asesoría': 'Personalizada',
      'Prioridad': 'Horarios pico',
    },
  },
  {
    id: 'gym-supl-1',
    categoria_id: 'cat-suplementos',
    codigo: 'SUP-WHEY',
    nombre: 'Whey Isolate Protein (1 Kg)',
    descripcion: 'Proteína aislada de rápida asimilación para ganancia muscular.',
    precio: 120.0,
    imagen_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80',
    variantes: ['Chocolate', 'Vainilla', 'Frutos rojos'],
    disponible: true,
    specs: {
      'Proteína': '24 g por porción',
      'Carbohidratos': '2 g',
      'Grasas': '1 g',
    },
  },
  {
    id: 'gym-supl-2',
    categoria_id: 'cat-suplementos',
    codigo: 'SUP-CREAT',
    nombre: 'Creatina Monohidratada (300 g)',
    descripcion: 'Fuerza, resistencia y volumen celular con pureza 100%.',
    precio: 80.0,
    imagen_url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80',
    variantes: ['Natural (Sin sabor)'],
    disponible: true,
    specs: {
      'Porción': '5 g',
      'Creatina': '5 g pura',
      'Tomas': '60 porciones',
    },
  },
];

// =========================================================================
// 05. PRESET BELLEZA: BELLEZA & COSMÉTICA
// Basado en imagen media_1794683669184_daf84543.jpg
// Paleta: #FFFFFF (Blanco), #FDF8F9 (Rosa Sutil), #9F1239 (Vino), #D3A49A
// Tipografía: Playfair Display + Inter
// =========================================================================

export const PRESET_GLOW_STUDIO: TenantConfig = {
  slug: 'belleza',
  businessName: 'BELLEZA & COSMÉTICA',
  tagline: 'Cuidado facial especializado, fórmulas testeadas y maquillaje de alta cobertura',
  subTagline: 'BOUTIQUE COSMÉTICA • ASESORÍA PERSONALIZADA',
  rubro: 'belleza',
  whatsappNumber: '51966777888',
  currency: 'S/',
  location: 'Jr. 28 de Julio 412, Huamanga',
  pickupAddress: 'Jr. 28 de Julio 412, Centro Histórico',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'PRODUCTOS 100% ORIGINALES',
    subtext: 'Fórmulas efectivas y dermatológicamente testadas',
    isLive: true,
  },
  hero: {
    title: 'PIEL SANA,',
    highlightText: 'RADIANTE Y REAL.',
    subtitle: 'Sérums, hidratantes y tratamientos especializados para tu rutina diaria de cuidado.',
    ctaText: 'EXPLORAR RUTINAS →',
    bannerUrl: 'https://images.unsplash.com/photo-1608248597359-54d1933c063f?w=1200&auto=format&fit=crop&q=80',
    badge: 'CUIDADO FACIAL',
  },
  categories: [
    { id: 'cat-all', name: 'Lo más vendido', iconName: 'sparkles' },
    { id: 'cat-maquillaje', name: 'Maquillaje', iconName: 'sparkles' },
    { id: 'cat-facial', name: 'Tratamiento facial', iconName: 'sparkles' },
    { id: 'cat-serums', name: 'Sérums', iconName: 'box' },
    { id: 'cat-hidratantes', name: 'Hidratantes', iconName: 'box' },
  ],
  theme: {
    primaryColor: '#9F1239',
    accentColor: '#D3A49A',
    bgColor: '#FFFFFF',
    cardBgColor: '#FDF8F9',
    textColor: '#18181B',
    headerBgColor: '#FFFFFF',
    headerTextColor: '#18181B',
    isDarkMode: false,
    fontHeading: 'font-serif',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Tono',
    requireCustomerAddress: true,
    customizationType: 'beauty',
  },
};

export const MOCK_PRODUCTS_GLOW_STUDIO: StoreProduct[] = [
  {
    id: 'glow-1',
    categoria_id: 'cat-maquillaje',
    codigo: 'GLOW-LIP01',
    nombre: 'Labial Hidratante Mate',
    descripcion: 'Color intenso y confort todo el día. Fórmula con vitamina E y manteca de karité.',
    precio: 49.0,
    imagen_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    variantes: ['Rosa Profundo', 'Nude Rosa', 'Rojo Rubí', 'Vino'],
    acabados: [
      { name: 'Nude Rosa', colorHex: '#E0A899' },
      { name: 'Rosa Profundo', colorHex: '#C56276' },
      { name: 'Rojo Rubí', colorHex: '#B91C1C' },
      { name: 'Vino', colorHex: '#701A75' },
    ],
    disponible: true,
    destacado: true,
    badge: 'MÁS VENDIDO',
    rating: { score: 4.8, reviewsCount: 320 },
  },
  {
    id: 'glow-2',
    categoria_id: 'cat-maquillaje',
    codigo: 'GLOW-BASE01',
    nombre: 'Base de Alta Cobertura SPF 30',
    descripcion: 'Acabado satinado natural y resistente al sudor y clima andino.',
    precio: 69.0,
    imagen_url: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?w=800&auto=format&fit=crop&q=80',
    variantes: ['Tono Claro', 'Tono Medio', 'Tono Moreno'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 258 },
  },
  {
    id: 'glow-3',
    categoria_id: 'cat-serums',
    codigo: 'GLOW-SR01',
    nombre: 'Sérum Niacinamida 10%',
    descripcion: 'Reduce manchas, minimiza poros abiertos y regula la oleosidad.',
    precio: 89.0,
    imagen_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    variantes: ['30 ml'],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 412 },
  },
  {
    id: 'glow-4',
    categoria_id: 'cat-hidratantes',
    codigo: 'GLOW-CRM01',
    nombre: 'Crema Hidratante Reparadora',
    descripcion: 'Gel-crema liviano con ceramidas y ácido hialurónico.',
    precio: 79.0,
    imagen_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    variantes: ['50 ml'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 188 },
  },
];

// =========================================================================
// 06. PRESET LICORERÍA: LICORERÍA DELIVERY
// Basado en imagen media_1794683770155_0e150ecd.jpg
// Paleta: #07090E (Obsidian), #38BDF8 (Ice Blue), #F59E0B (Amber), #F3F5F7
// Tipografía: Grotesk Display + UI Sans + IBM Plex Mono
// =========================================================================

export const PRESET_LA_PREVIA: TenantConfig = {
  slug: 'licoreria',
  businessName: 'LICORERÍA DELIVERY',
  tagline: 'Licores seleccionados, cervezas al polo, combos con hielo y entrega nocturna',
  subTagline: 'DELIVERY 24/7 • HUAMANGA',
  rubro: 'licoreria',
  whatsappNumber: '51966999000',
  currency: 'S/',
  location: 'Jr. Callao 150, Huamanga',
  pickupAddress: 'Jr. Callao 150, Centro de Huamanga',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'BEBIDAS FRÍAS • DISPONIBILIDAD SEGÚN ZONA',
    subtext: 'Solo mayores de 18 años • Verificación de identidad al entregar',
    isLive: true,
  },
  hero: {
    title: 'LA NOCHE,',
    highlightText: 'A TU RITMO.',
    subtitle: 'Combos y bebidas para compartir. Consulta cobertura y horario de entrega en Huamanga.',
    ctaText: 'VER COMBOS →',
    bannerUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop&q=80',
    badge: 'COMBO DESTACADO',
  },
  categories: [
    { id: 'cat-all', name: 'Todos', iconName: 'glass' },
    { id: 'cat-pisco', name: 'Pisco', iconName: 'glass' },
    { id: 'cat-whisky', name: 'Whisky', iconName: 'glass' },
    { id: 'cat-gin', name: 'Gin', iconName: 'glass' },
    { id: 'cat-cervezas', name: 'Cervezas', iconName: 'glass' },
    { id: 'cat-mixers', name: 'Mixers', iconName: 'box' },
    { id: 'cat-hielo', name: 'Hielo', iconName: 'box' },
    { id: 'cat-piqueos', name: 'Piqueos', iconName: 'box' },
  ],
  theme: {
    primaryColor: '#38BDF8',
    accentColor: '#F59E0B',
    bgColor: '#07090E',
    cardBgColor: '#0F131D',
    textColor: '#F3F5F7',
    headerBgColor: '#07090E',
    headerTextColor: '#F3F5F7',
    isDarkMode: true,
    fontHeading: 'font-display',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Presentación',
    requireCustomerAddress: true,
    customizationType: 'liquor',
  },
};

export const MOCK_PRODUCTS_LA_PREVIA: StoreProduct[] = [
  {
    id: 'prev-1',
    categoria_id: 'cat-pisco',
    codigo: 'PACK-CHILC',
    nombre: 'Combo Chilcano',
    descripcion: 'Pisco Quebranta 750ml + Ginger Ale 1.5L + Hielo en cubos 3kg.',
    precio: 48.0,
    imagen_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80',
    variantes: ['Combo Clásico'],
    disponible: true,
    destacado: true,
    badge: 'COMBO DESTACADO',
    rating: { score: 4.9, reviewsCount: 280 },
  },
  {
    id: 'prev-2',
    categoria_id: 'cat-hielo',
    codigo: 'ADD-HIELO',
    nombre: 'Bolsa de hielo (3 kg)',
    descripcion: 'Cubos cristalinos de agua purificada.',
    precio: 5.0,
    imagen_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    variantes: ['Bolsa 3 kg'],
    disponible: true,
    rating: { score: 5.0, reviewsCount: 350 },
  },
  {
    id: 'prev-3',
    categoria_id: 'cat-mixers',
    codigo: 'ADD-VASOS',
    nombre: 'Vasos descartables (10 u)',
    descripcion: 'Vasos transparentes resistentes de 12 oz.',
    precio: 3.0,
    imagen_url: 'https://images.unsplash.com/photo-1572455857811-045fb4255b5d?w=800&auto=format&fit=crop&q=80',
    variantes: ['Paquete 10 unidades'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 110 },
  },
  {
    id: 'prev-4',
    categoria_id: 'cat-piqueos',
    codigo: 'ADD-SNACK',
    nombre: 'Piqueo mixto (250 g)',
    descripcion: 'Maní tostado, habas y chifles artesanales.',
    precio: 18.0,
    imagen_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&auto=format&fit=crop&q=80',
    variantes: ['250 gramos'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 95 },
  },
  {
    id: 'prev-5',
    categoria_id: 'cat-cervezas',
    codigo: 'PACK-CUSQ',
    nombre: 'Pack x6 Cervezas Heladas',
    descripcion: '6 botellas de 330ml al polo para consumo inmediato.',
    precio: 32.0,
    imagen_url: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop&q=80',
    variantes: ['Trigo', 'Dorada'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 190 },
  },
];

// =========================================================================
// REGISTRO DE PRESETS Y RESOLUCIÓN DINÁMICA
// =========================================================================

export const ALL_DEMO_PRESETS: Record<
  string,
  { config: TenantConfig; products: StoreProduct[] }
> = {
  calzados: { config: PRESET_CALZADOS, products: MOCK_PRODUCTS_CALZADOS },
  pasteleria: { config: PRESET_PASTELERIA, products: MOCK_PRODUCTS_PASTELERIA },
  polleria: { config: PRESET_DON_BRASAS, products: MOCK_PRODUCTS_DON_BRASAS },
  gym: { config: PRESET_TRANKILANDIA, products: MOCK_PRODUCTS_TRANKILANDIA },
  belleza: { config: PRESET_GLOW_STUDIO, products: MOCK_PRODUCTS_GLOW_STUDIO },
  licoreria: { config: PRESET_LA_PREVIA, products: MOCK_PRODUCTS_LA_PREVIA },
};

export function resolveDemoPreset(rubroQuery: string): {
  config: TenantConfig;
  products: StoreProduct[];
} {
  const lower = (rubroQuery || '').toLowerCase();

  if (lower.includes('calzado') || lower.includes('zapato') || lower.includes('ropa') || lower.includes('moda')) {
    return ALL_DEMO_PRESETS.calzados;
  }
  if (lower.includes('pasteleria') || lower.includes('cafe') || lower.includes('torta') || lower.includes('reposteria')) {
    return ALL_DEMO_PRESETS.pasteleria;
  }
  if (lower.includes('polleria') || lower.includes('brasas') || lower.includes('comida') || lower.includes('pollo') || lower.includes('restaurante')) {
    return ALL_DEMO_PRESETS.polleria;
  }
  if (lower.includes('gym') || lower.includes('fitness') || lower.includes('crossfit')) {
    return ALL_DEMO_PRESETS.gym;
  }
  if (lower.includes('belleza') || lower.includes('cosmetica') || lower.includes('skincare')) {
    return ALL_DEMO_PRESETS.belleza;
  }
  if (lower.includes('licoreria') || lower.includes('tragos') || lower.includes('cerveza') || lower.includes('bar')) {
    return ALL_DEMO_PRESETS.licoreria;
  }

  return ALL_DEMO_PRESETS.calzados;
}
