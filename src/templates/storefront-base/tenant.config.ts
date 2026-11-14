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
  icon?: string;
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
  variantes: string[]; // Tallas, Porciones, Sabores, etc.
  acabados?: ProductVariantAcabado[]; // Para calzados (Negro, Tabaco, Miel) o belleza
  disponible: boolean;
  destacado?: boolean;
  badge?: string; // 'DESTACADO', 'MÁS VENDIDO', '-20% OFF', 'RECOMENDADO'
  rating?: { score: number; reviewsCount: number };
  specs?: Record<string, string>; // e.g. { 'Proteína': '24g', 'Carbs': '2g' }
  portionOptions?: Array<{ label: string; price: number; detail?: string }>;
}

export interface CartCustomizationDetails {
  guarnicion?: string; // e.g. 'Papas Nativas'
  salsas?: string[]; // e.g. ['Ají Pollero', 'Mayonesa']
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
  whatsappNumber: string; // ej: "51966888777" (sin + ni espacios)
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
    variantLabel: string; // "Talla", "Porción", "Turno", "Sabor", "Tono"
    requireCustomerAddress: boolean;
    customizationType: 'shoes' | 'cake' | 'rotisserie' | 'gym' | 'beauty' | 'liquor' | 'none';
  };
}

// =========================================================================
// 01. PRESET CALZADOS: LUCAS FOOTWEAR HUAMANGA
// Sistema de Diseño: Bebas Neue / Condensed, Marfil #FAF8F5, Carbón #121212, Carmín #B91C1C
// =========================================================================

export const PRESET_CALZADOS: TenantConfig = {
  slug: 'calzados-lucas',
  businessName: 'Lucas Footwear Huamanga',
  tagline: 'Calzado urbano contemporáneo y botines en puro cuero artesanal ayacuchano',
  subTagline: 'Calzado Urbano • Hecho en Huamanga',
  rubro: 'calzado',
  whatsappNumber: '51966888777',
  currency: 'S/',
  location: 'Jr. Asamblea 245, Huamanga, Ayacucho',
  pickupAddress: 'Jr. Asamblea 245, Huamanga, Ayacucho',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: 'Taller Activo • Huamanga',
    subtext: 'Envíos hoy en Huamanga y a todo el Perú',
    isLive: true,
  },
  hero: {
    title: 'PISAR CON IDENTIDAD.',
    highlightText: 'HECHO EN HUAMANGA',
    subtitle: 'Diseño urbano, hormas anatómicas y cuero vacuno seleccionado a mano por maestros zapateros.',
    ctaText: 'EXPLORAR COLECCIÓN ↗',
    bannerUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop&q=80',
    badge: 'COLECCIÓN ANDINA 2026',
  },
  categories: [
    { id: 'cat-all', name: 'Todos los Modelos', icon: '👟' },
    { id: 'cat-sneakers', name: 'Sneakers Urbanos', icon: '⚡' },
    { id: 'cat-cuero', name: 'Botines de Cuero', icon: '🥾' },
    { id: 'cat-mocasines', name: 'Mocasines & Formal', icon: '👞' },
    { id: 'cat-ofertas', name: 'Liquidación / Sale', icon: '🔥' },
  ],
  theme: {
    primaryColor: '#B91C1C', // Carmín Ayacuchano
    accentColor: '#121212', // Carbón Profundo
    bgColor: '#FAF8F5', // Marfil Suave Táctil
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
    nombre: 'Botín Andino 01 Cuero Natural',
    descripcion: 'Puro cuero vacuno curtido al vegetal, costura goodyear reforzada y suela dentada de caucho antideslizante.',
    precio: 289.0,
    precio_oferta: 269.0,
    imagen_url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41', '42'],
    acabados: [
      { name: 'Negro Mate', colorHex: '#1C1917' },
      { name: 'Tabaco Rústico', colorHex: '#78350F' },
      { name: 'Miel Caramelo', colorHex: '#D97706' },
    ],
    disponible: true,
    destacado: true,
    badge: 'MÁS VENDIDO',
    rating: { score: 4.9, reviewsCount: 148 },
  },
  {
    id: 'calz-2',
    categoria_id: 'cat-sneakers',
    codigo: 'LFH-SN01',
    nombre: 'Sneaker Piedra Classic Huamanga',
    descripcion: 'Capellada de gamuza premium y cuero suave, forro textil transpirable y plantilla ergonómica de amortiguación alta.',
    precio: 219.0,
    imagen_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    variantes: ['37', '38', '39', '40', '41'],
    acabados: [
      { name: 'Gris Piedra & Negro', colorHex: '#52525B' },
      { name: 'Blanco Nieve', colorHex: '#F4F4F5' },
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
    nombre: 'Sneaker Caliza Urban Runner',
    descripcion: 'Zapatilla urbana de perfil bajo con detalles perforados y suela de caucho vulcanizado ultra ligera.',
    precio: 199.0,
    precio_oferta: 185.0,
    imagen_url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80',
    variantes: ['38', '39', '40', '41', '42'],
    disponible: true,
    badge: 'OFERTA -15%',
    rating: { score: 4.7, reviewsCount: 86 },
  },
  {
    id: 'calz-4',
    categoria_id: 'cat-mocasines',
    codigo: 'LFH-MC01',
    nombre: 'Mocasín Ejecutivo Cuero Café',
    descripcion: 'Elegancia y máxima comodidad sin pasadores. Cuero napa lustrable para oficina o ceremonias tradicionales.',
    precio: 240.0,
    imagen_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
    variantes: ['39', '40', '41', '42'],
    acabados: [
      { name: 'Café Roble', colorHex: '#451A03' },
      { name: 'Negro Ónix', colorHex: '#18181B' },
    ],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 54 },
  },
];

// =========================================================================
// 02. PRESET PASTELERIA: LAS FLORES PASTELERIA & CAFE
// Sistema de Diseño: Serif Editorial, Marfil #FAF7F2, Espresso #291508, Canela #A46A3F
// =========================================================================

export const PRESET_PASTELERIA: TenantConfig = {
  slug: 'lasflores',
  businessName: 'Pastelería & Café Las Flores',
  tagline: 'Tortas finas de autor, desayunos tradicionales y café de altura en Huamanga',
  subTagline: 'Pastelería Artesanal & Café de Especialidad',
  rubro: 'pasteleria',
  whatsappNumber: '51966000111',
  currency: 'S/',
  location: 'Jr. Bellido 180, frente a San Francisco, Huamanga',
  pickupAddress: 'Jr. Bellido 180 (Frente al templo San Francisco)',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: '🟢 Horneado hoy',
    subtext: 'Tortas para hoy y reservas anticipadas',
    isLive: true,
  },
  hero: {
    title: 'DULCES MOMENTOS,',
    highlightText: 'HECHOS AQUÍ.',
    subtitle: 'Cacao cusqueño al 70%, frutos del valle y pan caliente horneado en nuestro taller cada madrugada.',
    ctaText: 'DESCUBRIR LA CARTA ↗',
    bannerUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80',
    badge: 'REPOSTERÍA DE AUTOR',
  },
  categories: [
    { id: 'cat-past-all', name: 'Toda la Carta', icon: '✨' },
    { id: 'cat-tortas', name: 'Tortas de Celebración', icon: '🎂' },
    { id: 'cat-porciones', name: 'Porciones del Día', icon: '🍰' },
    { id: 'cat-desayunos', name: 'Desayunos Huamanguinos', icon: '🥐' },
    { id: 'cat-cafe', name: 'Café de Especialidad', icon: '☕' },
  ],
  theme: {
    primaryColor: '#291508', // Espresso Profundo
    accentColor: '#A46A3F', // Canela Tostada
    bgColor: '#FAF7F2', // Marfil Cálido Repostería
    cardBgColor: '#FFFFFF',
    textColor: '#291508',
    headerBgColor: '#FAF7F2',
    headerTextColor: '#291508',
    isDarkMode: false,
    fontHeading: 'font-serif',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Porción / Tamaño',
    requireCustomerAddress: true,
    customizationType: 'cake',
  },
};

export const PRESET_LASFLORES = PRESET_PASTELERIA;

export const MOCK_PRODUCTS_PASTELERIA: StoreProduct[] = [
  {
    id: 'past-1',
    categoria_id: 'cat-tortas',
    nombre: 'Torta Clásica Selva Negra de Autor',
    descripcion: 'Bizcochuelo húmedo de cacao cusqueño 70%, crema chantilly fresca, cerezas silvestres maceradas y lluvia de virutas de chocolate amargo.',
    precio: 85.0,
    precio_oferta: 75.0,
    imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    variantes: ['Personal (4 porc.)', 'Mediana (10 porc.)', 'Familiar (20 porc.)'],
    portionOptions: [
      { label: 'Personal (4 porc.)', price: 35.0, detail: 'Ideal para 2-4 personas' },
      { label: 'Mediana (10 porc.)', price: 75.0, detail: 'Reuniones y cumpleaños' },
      { label: 'Familiar (20 porc.)', price: 110.0, detail: 'Celebraciones grandes' },
    ],
    disponible: true,
    destacado: true,
    badge: 'MÁS PEDIDA',
    rating: { score: 5.0, reviewsCount: 230 },
  },
  {
    id: 'past-2',
    categoria_id: 'cat-desayunos',
    nombre: 'Desayuno Huamanguino Clásico de la Casa',
    descripcion: 'Tamalito ayacuchano en hoja de plátano, chicharrón crocante de panceta, pan chapla calientito, camote frito, sarza criolla y café pasado de altura.',
    precio: 24.0,
    imagen_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80',
    variantes: ['Con Café Pasado', 'Con Chocolate Ayacuchano'],
    disponible: true,
    destacado: true,
    badge: 'TRADICIÓN',
    rating: { score: 4.9, reviewsCount: 195 },
  },
  {
    id: 'past-3',
    categoria_id: 'cat-porciones',
    nombre: 'Porción del Día: Torta de Zanahoria & Nuez',
    descripcion: 'Masa especiada con nueces tostadas y canela, cubierta de un sedoso frosting de queso crema artesanal.',
    precio: 12.0,
    imagen_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&auto=format&fit=crop&q=80',
    variantes: ['Porción Individual'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 94 },
  },
  {
    id: 'past-4',
    categoria_id: 'cat-cafe',
    nombre: 'Café Cappuccino Doble con Arte Latte',
    descripcion: 'Doble shot de espresso de grano arábica cultivado a 1,800 msnm con leche texturizada aterciopelada.',
    precio: 9.5,
    imagen_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Normal', 'Deslactosada', 'Leche de Almendras (+S/ 2)'],
    disponible: true,
    rating: { score: 4.9, reviewsCount: 160 },
  },
];

// =========================================================================
// 03. PRESET POLLERIA: DON BRASAS HUAMANGA
// Sistema de Diseño Refinado Anti-IA:
// Fondo Gris Niebla #F3F4F2, Tarjetas Blancas #FFFFFF, Carbón #171717, Rojo Brasas #A62920
// =========================================================================

export const PRESET_DON_BRASAS: TenantConfig = {
  slug: 'don-brasas',
  businessName: 'Don Brasas Huamanga',
  tagline: 'Pollería a la brasa, parrillas al carbón de leña y combos familiares con delivery express',
  subTagline: 'Pollería a la Brasa & Parrillas al Carbón',
  rubro: 'polleria',
  whatsappNumber: '51966555444',
  currency: 'S/',
  location: 'Av. Los Próceres 310, Huamanga, Ayacucho',
  pickupAddress: 'Av. Los Próceres 310 (Frente al Parque de la Memoria)',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega', 'Tarjeta en POS'],
  statusBadge: {
    text: '🟢 Horno a la Brasa Activo',
    subtext: 'Tiempo estimado de despacho: 20-25 min',
    isLive: true,
  },
  hero: {
    title: 'EL SABOR DE LA BRASA.',
    highlightText: 'SIN ESPERAR.',
    subtitle: 'Pollo marinado con hierbas andinas, piel crocante dorada al carbón de algarrobo y papas nativas fritas al instante.',
    ctaText: 'VER COMBOS FAMILIARES 🍗',
    bannerUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&auto=format&fit=crop&q=80',
    badge: 'DELIVERY NOCTURNO HUAMANGA',
  },
  categories: [
    { id: 'cat-brasas-all', name: 'Todo el Menú', icon: '🔥' },
    { id: 'cat-combos', name: 'Combos Braseros', icon: '🍗' },
    { id: 'cat-pollos', name: 'Pollos a la Brasa', icon: '✨' },
    { id: 'cat-parrillas', name: 'Parrillas & Carnes', icon: '🥩' },
    { id: 'cat-bebidas', name: 'Bebidas & Gaseosas', icon: '🥤' },
  ],
  theme: {
    primaryColor: '#A62920', // Rojo Brasas Comercial
    accentColor: '#F59E0B', // Ámbar Fuego
    bgColor: '#F3F4F2', // Gris Niebla (Limpio, descansado, cero marfil pesado)
    cardBgColor: '#FFFFFF', // Blanco Nítido
    textColor: '#171717', // Carbón Profundo
    headerBgColor: '#171717', // Header de contraste
    headerTextColor: '#FFFFFF',
    isDarkMode: false,
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
    nombre: 'Combo Brasero Familiar (1 Pollo Entero)',
    descripcion: '1 Pollo a la brasa dorado al carbón + Porción gigante de papas nativas crocantes + Ensalada fresca clásica + 4 salsas artesanales (Ají pollero, Mayonesa de la casa, Chimichurri, Ocopa).',
    precio: 68.0,
    precio_oferta: 64.0,
    imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    variantes: ['Papas Nativas Crocantes', 'Papas Tradicionales'],
    disponible: true,
    destacado: true,
    badge: 'MÁS PEDIDO 🔥',
    rating: { score: 4.9, reviewsCount: 310 },
  },
  {
    id: 'bras-2',
    categoria_id: 'cat-pollos',
    codigo: 'POLLO-1/4',
    nombre: '1/4 Pollo a la Brasa con Papas y Cremas',
    descripcion: 'Cuarto de pollo (pechuga jugosa o pierna con encuentro) con abundante porción de papas fritas y cremas.',
    precio: 22.0,
    imagen_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    variantes: ['Pechuga con Ala', 'Pierna con Encuentro'],
    portionOptions: [
      { label: '1/4 Pollo', price: 22.0, detail: 'Pechuga o Pierna con papas' },
      { label: '1/2 Pollo', price: 39.0, detail: 'Para 2 personas con papas' },
      { label: '1 Pollo Entero', price: 68.0, detail: 'Familiar completo con papas' },
    ],
    disponible: true,
    destacado: true,
    badge: 'CLÁSICO',
    rating: { score: 4.8, reviewsCount: 220 },
  },
  {
    id: 'bras-3',
    categoria_id: 'cat-pollos',
    codigo: 'POLLO-1/2',
    nombre: '1/2 Pollo a la Brasa + Papas + Ensalada',
    descripcion: 'Medio pollo dorado a la brasa con papas crocantes, ensalada con vinagreta polleta y salsas.',
    precio: 39.0,
    imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    variantes: ['Papas Tradicionales', 'Papas Nativas'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 140 },
  },
  {
    id: 'bras-4',
    categoria_id: 'cat-parrillas',
    codigo: 'PARR-01',
    nombre: 'Hamburguesa Artesanal Don Brasas a la Parrilla',
    descripcion: '180g de carne de res molida a la parrilla, queso cheddar derretido, lechuga crocante, tomate y papas fritas al hilo.',
    precio: 18.0,
    imagen_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Simple', 'Con Huevo & Tocino (+S/ 4)'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 88 },
  },
  {
    id: 'bras-5',
    categoria_id: 'cat-bebidas',
    codigo: 'BEB-01',
    nombre: 'Jarra de Chicha Morada Casera 1.5L',
    descripcion: 'Maíz morado ayacuchano hervido con piña, manzana, membrillo, canela y gotas de limón fresco.',
    precio: 12.0,
    imagen_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Helada', 'Sin Helar'],
    disponible: true,
    rating: { score: 5.0, reviewsCount: 175 },
  },
];

// =========================================================================
// 04. PRESET GYM: TRANKILANDIA GYM & FITNESS HUAMANGA
// Sistema de Diseño: Dark Obsidian #0A0C10, Cyber Lime #10B981, Blanco Técnico #F5F7FA
// =========================================================================

export const PRESET_TRANKILANDIA: TenantConfig = {
  slug: 'trankilandia',
  businessName: 'Trankilandia Gym & Fitness',
  tagline: 'Fuerza, disciplina atlética, suplementación certificada y entrenamiento de alto rendimiento',
  subTagline: 'Centro de Rendimiento Físico & Nutrición Deportiva',
  rubro: 'gym',
  whatsappNumber: '51966000222',
  currency: 'S/',
  location: 'Av. Mariscal Cáceres 540, Huamanga, Ayacucho',
  pickupAddress: 'Av. Mariscal Cáceres 540 (A 2 cuadras del Óvalo de la Magdalena)',
  paymentMethods: ['Yape', 'Plin', 'Efectivo en counter', 'Transferencia BCP/BBVA'],
  statusBadge: {
    text: '🟢 Aforo en vivo: 32 / 60',
    subtext: 'Abierto hoy: 06:00 - 22:00',
    isLive: true,
  },
  hero: {
    title: 'ENTRENA CON PROPÓSITO.',
    highlightText: 'PROGRESO MEDIBLE.',
    subtitle: 'Área de peso libre, máquinas biomecánicas de última generación, casilleros seguros y asesoría de rutina personalizada.',
    ctaText: 'VER PLANES DE MEMBRESÍA 🏋️',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    badge: 'PORTAL DE MATRÍCULA & SOCIOS',
  },
  categories: [
    { id: 'cat-gym-all', name: 'Todo', icon: '⚡' },
    { id: 'cat-membresias', name: 'Planes de Membresía', icon: '🎟️' },
    { id: 'cat-suplementos', name: 'Proteínas & Nutrición', icon: '💊' },
    { id: 'cat-pases', name: 'Pases Diarios', icon: '⏱️' },
  ],
  theme: {
    primaryColor: '#10B981', // Verde Cyber Lime
    accentColor: '#059669',
    bgColor: '#0A0C10', // Dark Obsidian
    cardBgColor: '#111827',
    textColor: '#F5F7FA', // Blanco Técnico
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
    id: 'gym-plan-2',
    categoria_id: 'cat-membresias',
    codigo: 'MEM-MES',
    nombre: 'Membresía Mensual Pase Libre',
    descripcion: 'Acceso total e ilimitado por 30 días a sala de musculación, cardio, casillero personal y asesoría de rutina inicial.',
    precio: 75.0,
    precio_oferta: 70.0,
    imagen_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    variantes: ['Turno Mañana (06:00-12:00)', 'Turno Tarde (12:00-17:00)', 'Turno Libre Completo'],
    disponible: true,
    destacado: true,
    badge: 'MÁS VENDIDO 🥇',
    rating: { score: 4.9, reviewsCount: 420 },
    specs: {
      'Acceso': 'Ilimitado 30 días',
      'Evaluación': '1 Evaluación física',
      'Casillero': 'Incluido gratis',
    },
  },
  {
    id: 'gym-plan-3',
    categoria_id: 'cat-membresias',
    codigo: 'MEM-TRIM',
    nombre: 'Trimestre Pro Disciplina Total (90 Días)',
    descripcion: '3 meses completos de entrenamiento continuo con seguimiento quincenal de peso, porcentaje de grasa y reajuste de rutina.',
    precio: 195.0,
    precio_oferta: 180.0,
    imagen_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    variantes: ['Pase Individual', 'Promo Parejas (x2 personas por S/ 350)'],
    disponible: true,
    badge: 'AHORRA S/ 45',
    rating: { score: 5.0, reviewsCount: 160 },
    specs: {
      'Duración': '90 días calendario',
      'Congelamiento': 'Hasta 15 días permitido',
      'Beneficio': 'Rutina en app móvil',
    },
  },
  {
    id: 'gym-supl-1',
    categoria_id: 'cat-suplementos',
    codigo: 'SUP-WHEY',
    nombre: 'Whey Isolate Protein 100% Pura (1 Kg)',
    descripcion: 'Proteína aislada de rápida absorción, ideal para ganancia muscular magra y recuperación post-entrenamiento.',
    precio: 120.0,
    imagen_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80',
    variantes: ['Chocolate Suizo', 'Vainilla Francesa', 'Frutos Rojos'],
    disponible: true,
    destacado: true,
    badge: 'SUPLEMENTO TOP',
    rating: { score: 4.8, reviewsCount: 95 },
    specs: {
      'Proteína': '24g por porción',
      'Carbohidratos': '2g',
      'Grasas': '1g',
    },
  },
  {
    id: 'gym-plan-1',
    categoria_id: 'cat-pases',
    codigo: 'PASE-DIA',
    nombre: 'Pase Diario de Entrenamiento (1 Sesión)',
    descripcion: 'Pase por 1 día completo con uso de todas las máquinas, duchas calientes y vestidores para visitantes o viajeros.',
    precio: 10.0,
    imagen_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    variantes: ['Día Completo'],
    disponible: true,
    rating: { score: 4.6, reviewsCount: 88 },
  },
];

// =========================================================================
// 05. PRESET BELLEZA: GLOW STUDIO HUAMANGA
// Sistema de Diseño: Playfair Display, Blanco Perla #FFFFFF, Rosa #FDF8F9, Vino #9F1239
// =========================================================================

export const PRESET_GLOW_STUDIO: TenantConfig = {
  slug: 'glow-studio',
  businessName: 'Glow Studio Huamanga',
  tagline: 'Skincare clínico, maquillaje de alta cobertura y cosmética 100% original certificada',
  subTagline: 'Boutique de Belleza, Cuidado Facial & Maquillaje',
  rubro: 'belleza',
  whatsappNumber: '51966777888',
  currency: 'S/',
  location: 'Jr. 28 de Julio 412, Centro Histórico, Huamanga',
  pickupAddress: 'Jr. 28 de Julio 412 (A 1 cuadra de la Plaza Mayor)',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega', 'Tarjeta'],
  statusBadge: {
    text: '✨ 100% Original Certificado',
    subtext: 'Envíos hoy en Huamanga y a todo el Perú',
    isLive: true,
  },
  hero: {
    title: 'PIEL SANA,',
    highlightText: 'RADIANTE Y REAL.',
    subtitle: 'Fórmulas dermatológicamente testeadas, sérums activos y asesoría de tono personalizada para tu tipo de piel.',
    ctaText: 'EXPLORAR RUTINAS FACIALES ✨',
    bannerUrl: 'https://images.unsplash.com/photo-1608248597359-54d1933c063f?w=1200&auto=format&fit=crop&q=80',
    badge: 'BOUTIQUE COSMÉTICA DE AUTOR',
  },
  categories: [
    { id: 'cat-glow-all', name: 'Todos los Productos', icon: '💄' },
    { id: 'cat-skincare', name: 'Cuidado Facial / Skincare', icon: '🧴' },
    { id: 'cat-maquillaje', name: 'Maquillaje & Labiales', icon: '💋' },
    { id: 'cat-hidratantes', name: 'Cremas & Protectores', icon: '✨' },
  ],
  theme: {
    primaryColor: '#9F1239', // Vino Alta Gama
    accentColor: '#D3A49A', // Rose Gold
    bgColor: '#FFFFFF', // Blanco Perla
    cardBgColor: '#FDF8F9', // Rosa Empolvado Ultra Sutil
    textColor: '#18181B',
    headerBgColor: '#FFFFFF',
    headerTextColor: '#18181B',
    isDarkMode: false,
    fontHeading: 'font-serif',
  },
  features: {
    enableVariants: true,
    variantLabel: 'Tono / Presentación',
    requireCustomerAddress: true,
    customizationType: 'beauty',
  },
};

export const MOCK_PRODUCTS_GLOW_STUDIO: StoreProduct[] = [
  {
    id: 'glow-1',
    categoria_id: 'cat-maquillaje',
    codigo: 'GLOW-LIP01',
    nombre: 'Labial Hidratante Mate Larga Duración',
    descripcion: 'Color intenso y confort aterciopelado todo el día. Fórmula enriquecida con vitamina E y manteca de karité pura.',
    precio: 49.0,
    imagen_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    variantes: ['Nude Rosa', 'Rosa Profundo', 'Rojo Rubí', 'Vino Borgoña'],
    acabados: [
      { name: 'Nude Rosa', colorHex: '#E0A899' },
      { name: 'Rosa Profundo', colorHex: '#C56276' },
      { name: 'Rojo Rubí', colorHex: '#B91C1C' },
      { name: 'Vino Borgoña', colorHex: '#701A75' },
    ],
    disponible: true,
    destacado: true,
    badge: 'MÁS VENDIDO ⭐',
    rating: { score: 4.8, reviewsCount: 320 },
  },
  {
    id: 'glow-2',
    categoria_id: 'cat-skincare',
    codigo: 'GLOW-SR01',
    nombre: 'Sérum Niacinamida 10% + Zinc 1% (30ml)',
    descripcion: 'Reduce manchas, minimiza poros abiertos y regula el exceso de oleosidad sin resecar la barrera cutánea.',
    precio: 89.0,
    imagen_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    variantes: ['30 ml'],
    disponible: true,
    destacado: true,
    badge: 'FAVORITO SKINCARE',
    rating: { score: 4.9, reviewsCount: 412 },
  },
  {
    id: 'glow-3',
    categoria_id: 'cat-maquillaje',
    codigo: 'GLOW-BASE01',
    nombre: 'Base de Maquillaje Fluida Alta Cobertura SPF 30',
    descripcion: 'Acabado satinado natural y resistente al sudor y clima andino con protección solar mineral.',
    precio: 69.0,
    imagen_url: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?w=800&auto=format&fit=crop&q=80',
    variantes: ['Tono 01 Claro (Subtono Neutro)', 'Tono 02 Medio (Subtono Cálido)', 'Tono 03 Moreno (Subtono Dorado)'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 258 },
  },
  {
    id: 'glow-4',
    categoria_id: 'cat-hidratantes',
    codigo: 'GLOW-CRM01',
    nombre: 'Crema Hidratante Reparadora Ceramidas & Ácido Hialurónico',
    descripcion: 'Textura gel-crema ultra ligera para piel seca, mixta o sensible que restaura la humedad profunda.',
    precio: 79.0,
    imagen_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    variantes: ['Pote 50 ml'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 188 },
  },
];

// =========================================================================
// 06. PRESET LICORERIA: LA PREVIA HUAMANGA DELIVERY 24/7
// Sistema de Diseño: Midnight Obsidian #07090E, Ice Blue #38BDF8, Ámbar #F59E0B
// =========================================================================

export const PRESET_LA_PREVIA: TenantConfig = {
  slug: 'la-previa',
  businessName: 'La Previa Huamanga',
  tagline: 'Licores finos, cervezas al polo, combos con hielo y snacks con despacho en 20 minutos',
  subTagline: 'Licorería Express & Delivery Nocturno 24/7',
  rubro: 'licoreria',
  whatsappNumber: '51966999000',
  currency: 'S/',
  location: 'Jr. Callao 150, Huamanga, Ayacucho',
  pickupAddress: 'Jr. Callao 150 (Centro de Huamanga)',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  statusBadge: {
    text: '❄️ Bebidas 100% Heladas',
    subtext: 'Entrega en 20 min en Huamanga, San Juan y Carmen Alto',
    isLive: true,
  },
  hero: {
    title: 'LA NOCHE,',
    highlightText: 'A TU RITMO.',
    subtitle: 'Combos con hielo, gaseosa y piqueos listos para servir. Paga al recibir con Yape o Plin.',
    ctaText: 'VER COMBOS HELADOS ❄️',
    bannerUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop&q=80',
    badge: 'DELIVERY EXPRESS 20 MINUTOS',
  },
  categories: [
    { id: 'cat-previa-all', name: 'Todos los Combos', icon: '⚡' },
    { id: 'cat-combos-trago', name: 'Combos Chilcano & Pisco', icon: '🍹' },
    { id: 'cat-cervezas', name: 'Cervezas Heladas', icon: '🍺' },
    { id: 'cat-whiskies', name: 'Whisky & Ron', icon: '🥃' },
    { id: 'cat-complementos', name: 'Hielo & Piqueos', icon: '🧊' },
  ],
  theme: {
    primaryColor: '#38BDF8', // Ice Blue Glacial
    accentColor: '#F59E0B', // Ámbar Destilado
    bgColor: '#07090E', // Midnight Obsidian
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
    categoria_id: 'cat-combos-trago',
    codigo: 'PACK-CHILC',
    nombre: 'Combo Chilcanero: Pisco Quebranta 750ml + Ginger Ale + Hielo',
    descripcion: '1 Botella Pisco Quebranta 750ml + 1 Botella Evervess Ginger Ale 1.5L + 1 Bolsa Hielo 3 Kg + Limones frescos para chilcanos.',
    precio: 48.0,
    imagen_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80',
    variantes: ['Con Evervess Ginger Ale', 'Con Canada Dry'],
    disponible: true,
    destacado: true,
    badge: 'COMBO DESTACADO 🍹',
    rating: { score: 4.9, reviewsCount: 280 },
  },
  {
    id: 'prev-2',
    categoria_id: 'cat-cervezas',
    codigo: 'PACK-CUSQ',
    nombre: 'Pack x6 Cervezas Cusqueña Trigo Heladas',
    descripcion: '6 botellas de 330ml 100% heladas (al polo) para consumo inmediato.',
    precio: 32.0,
    imagen_url: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop&q=80',
    variantes: ['Cusqueña Trigo', 'Cusqueña Dorada', 'Cusqueña Negra'],
    disponible: true,
    badge: 'SUPER HELADAS ❄️',
    rating: { score: 4.8, reviewsCount: 190 },
  },
  {
    id: 'prev-3',
    categoria_id: 'cat-complementos',
    codigo: 'ADD-HIELO',
    nombre: 'Bolsa de Hielo Purificado en Cubos (3 Kg)',
    descripcion: 'Hielo en cubos cristalinos de agua purificada, bolsa hermética sellada.',
    precio: 5.0,
    imagen_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    variantes: ['Bolsa 3 Kg'],
    disponible: true,
    rating: { score: 5.0, reviewsCount: 350 },
  },
  {
    id: 'prev-4',
    categoria_id: 'cat-complementos',
    codigo: 'ADD-VASOS',
    nombre: 'Vasos Descartables Duros 12 oz (Paquete x10)',
    descripcion: 'Vasos transparentes resistentes de polipropileno para coctelería.',
    precio: 3.0,
    imagen_url: 'https://images.unsplash.com/photo-1572455857811-045fb4255b5d?w=800&auto=format&fit=crop&q=80',
    variantes: ['Paquete x10'],
    disponible: true,
    rating: { score: 4.7, reviewsCount: 110 },
  },
  {
    id: 'prev-5',
    categoria_id: 'cat-complementos',
    codigo: 'ADD-SNACK',
    nombre: 'Piqueo Mixto Artesanal (250 g)',
    descripcion: 'Maní tostado salado, habas crocantes y chifles artesanales ayacuchanos.',
    precio: 18.0,
    imagen_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&auto=format&fit=crop&q=80',
    variantes: ['Piqueo Salado Tradicional'],
    disponible: true,
    rating: { score: 4.8, reviewsCount: 95 },
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

  if (lower.includes('calzado') || lower.includes('zapato') || lower.includes('ropa') || lower.includes('moda') || lower.includes('lucas')) {
    return ALL_DEMO_PRESETS.calzados;
  }
  if (lower.includes('pasteleria') || lower.includes('flores') || lower.includes('cafe') || lower.includes('torta')) {
    return ALL_DEMO_PRESETS.pasteleria;
  }
  if (lower.includes('polleria') || lower.includes('brasas') || lower.includes('comida') || lower.includes('pollo') || lower.includes('restaurante')) {
    return ALL_DEMO_PRESETS.polleria;
  }
  if (lower.includes('gym') || lower.includes('trankilandia') || lower.includes('fitness') || lower.includes('crossfit')) {
    return ALL_DEMO_PRESETS.gym;
  }
  if (lower.includes('belleza') || lower.includes('glow') || lower.includes('cosmetica') || lower.includes('skincare')) {
    return ALL_DEMO_PRESETS.belleza;
  }
  if (lower.includes('licoreria') || lower.includes('previa') || lower.includes('tragos') || lower.includes('cerveza') || lower.includes('bar')) {
    return ALL_DEMO_PRESETS.licoreria;
  }

  // Por defecto calzados
  return ALL_DEMO_PRESETS.calzados;
}
