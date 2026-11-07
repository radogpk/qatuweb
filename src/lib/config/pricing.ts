export interface PricingPlanConfig {
  id: 'mensual' | 'anual';
  name: string;
  tagline: string;
  badge: string;
  popular?: boolean;
  setupPrice: number;
  periodicPrice: number;
  periodLabel: string;
  dailyEquivalent: string;
  savingsNote?: string;
  deliveryDays: string;
  productsLimit: number;
  features: string[];
  ctaText: string;
}

export interface AddonModuleConfig {
  id: 'addon-mesas' | 'addon-inventario' | 'addon-dni';
  name: string;
  shortName: string;
  price: number;
  description: string;
  idealFor: string;
  badge: string;
}

export interface DemoVerticalConfig {
  id: string;
  name: string;
  category: string;
  slug: string;
  route: string;
  adminRoute: string;
  address: string;
  corePain: string;
  naturalUpsellId: 'addon-mesas' | 'addon-inventario' | 'addon-dni';
  tagline: string;
}

export const LAUNCH_PROMO_CONFIG = {
  totalSpots: 30,
  claimedSpots: 9, // Cupos tomados de muestra comercial para urgencia
  badgeText: "🔥 Lanzamiento Oficial Ayacucho",
  headline: "Congela tu tarifa en S/ 300 al año para siempre",
  subtext: "Válido para los primeros 30 comercios de Huamanga. Instalación y carga de 25 productos 100% GRATIS.",
};

export const OFFICIAL_PRICING_PLANS: PricingPlanConfig[] = [
  {
    id: 'mensual',
    name: 'Plan Mensual',
    tagline: 'Paso a paso mes a mes, sin contratos de permanencia.',
    badge: 'Mes a mes',
    setupPrice: 90,
    periodicPrice: 30,
    periodLabel: '/ mes',
    dailyEquivalent: 'S/ 1 al día',
    deliveryDays: '24 a 48 horas',
    productsLimit: 25,
    features: [
      'Subdominio seguro: tunegocio.qatuweb.com',
      'Catálogo móvil táctil adaptado a tu rubro',
      'Panel de Bolsillo (/admin) para apagar agotados en 1 toque',
      'Carrito flotante con comanda directa a WhatsApp',
      '0% de comisión por venta (vende poco o mucho)',
      'Compresión WebP automática para fotos de celular (<80 KB)',
      'Infraestructura aislada en Supabase y Cloudflare Edge',
      'Carga inicial de tus primeros 25 productos incluida',
    ],
    ctaText: 'Elegir Plan Mensual (S/ 30)',
  },
  {
    id: 'anual',
    name: 'Plan Anual Recomendado',
    tagline: 'La opción más inteligente: instalación GRATIS y 12 meses cubiertos.',
    badge: '⭐ El Más Vendido • Ahorra S/ 150',
    popular: true,
    setupPrice: 0,
    periodicPrice: 300,
    periodLabel: '/ año',
    dailyEquivalent: 'Equivale a S/ 25/mes (S/ 1 al día)',
    savingsNote: 'Ahorras 2 meses completos + S/ 90 de activación GRATIS',
    deliveryDays: '24 horas prioritario',
    productsLimit: 25,
    features: [
      'Todo lo del Plan Mensual cubierto por 12 meses completos',
      'Instalación y carga inicial de 25 productos GRATIS (Ahorras S/ 90)',
      'Precio congelado de por vida (Cupos de Lanzamiento)',
      'Código QR en alta resolución para mostrador o mesas',
      'Soporte prioritario VIP directo por WhatsApp',
      'Opción de conectar dominio propio (.com o .pe)',
      'Guardián Anti-Pausa 24/7 en base de datos',
    ],
    ctaText: 'Asegurar Plan Anual (S/ 300)',
  },
];

export const OFFICIAL_ADDONS: AddonModuleConfig[] = [
  {
    id: 'addon-mesas',
    name: 'Carta QR Avanzada con Mesas y Mozos',
    shortName: 'Mesas y Mozos',
    price: 70,
    description: 'Selector de número de mesa y mozo en la carta digital con envío directo a la comanda de WhatsApp.',
    idealFor: 'Restaurantes, pizzerías, cafeterías y salones',
    badge: '+S/ 70 pago único',
  },
  {
    id: 'addon-inventario',
    name: 'Control de Inventario con Alertas WhatsApp',
    shortName: 'Inventario con Alertas',
    price: 90,
    description: 'Alertas automáticas a tu WhatsApp cuando un producto esté por agotarse para no perder ventas.',
    idealFor: 'Tiendas de calzado, ropa, boutiques y minimarkets',
    badge: '+S/ 90 pago único',
  },
  {
    id: 'addon-dni',
    name: 'Integración Lector de DNI / Códigos de Barras',
    shortName: 'Lector DNI / Barras',
    price: 150,
    description: 'Control de acceso rápido y verificación de membresías usando la cámara del celular o lector físico.',
    idealFor: 'Gimnasios, academias, centros fitness y eventos',
    badge: '+S/ 150 pago único',
  },
];

export const OFFICIAL_VERTICALS: DemoVerticalConfig[] = [
  {
    id: 'calzado',
    name: 'Calzados Lucas Huamanga',
    category: 'Comercio, Calzado & Moda',
    slug: 'calzados-lucas',
    route: '/demo/calzados',
    adminRoute: '/demo/calzados/admin',
    address: 'Jr. Asamblea 245, Huamanga',
    corePain: 'Responder "¿tienes en talla 38?" mandando fotos sueltas que saturan el chat.',
    naturalUpsellId: 'addon-inventario',
    tagline: 'Catálogo con selector de tallas/colores, compresión WebP y comanda ordenada a WhatsApp.',
  },
  {
    id: 'pasteleria',
    name: 'Restaurante & Pastelería Las Flores',
    category: 'Gastronomía, Cafés & Carta QR',
    slug: 'lasflores',
    route: '/demo/pasteleria',
    adminRoute: '/demo/pasteleria/admin',
    address: 'Jr. Bellido 180, frente al templo San Francisco',
    corePain: 'Cartas en PDF pesadas que nadie descarga y platos agotados a mediodía.',
    naturalUpsellId: 'addon-mesas',
    tagline: 'Carta digital interactiva para salón y delivery con apagado de agotados en tiempo real.',
  },
  {
    id: 'gym',
    name: 'Trankilandia Gym & Fitness',
    category: 'Gimnasios, Membresías & Control',
    slug: 'trankilandia',
    route: '/demo/gym',
    adminRoute: '/demo/gym/admin',
    address: 'Av. Mariscal Cáceres 540, Huamanga',
    corePain: 'Cuadernos a mano para saber quién tiene la mensualidad vencida al entrar.',
    naturalUpsellId: 'addon-dni',
    tagline: 'Venta de pases online por WhatsApp, arqueo diario y control de membresías.',
  },
];

export function buildPricingWhatsAppUrl(
  planId: 'mensual' | 'anual',
  selectedAddonIds: string[] = []
): string {
  const plan = OFFICIAL_PRICING_PLANS.find((p) => p.id === planId) || OFFICIAL_PRICING_PLANS[1];
  const addons = OFFICIAL_ADDONS.filter((a) => selectedAddonIds.includes(a.id));

  const totalInicial =
    plan.id === 'anual'
      ? plan.periodicPrice + addons.reduce((acc, curr) => acc + curr.price, 0)
      : plan.setupPrice + plan.periodicPrice + addons.reduce((acc, curr) => acc + curr.price, 0);

  const addonsListText =
    addons.length > 0
      ? `\n🧩 *Módulos Adicionales:* \n` +
        addons.map((a) => `   • ${a.name} (+S/ ${a.price})`).join('\n')
      : '';

  const mensaje = [
    `Hola Qatu Web, quiero contratar el servicio para mi negocio en Ayacucho:`,
    ``,
    `📋 *Plan Seleccionado:* ${plan.name} (S/ ${plan.periodicPrice} ${plan.periodLabel})`,
    plan.id === 'anual' ? `✨ *Instalación:* 100% GRATIS (S/ 0)` : `🔧 *Activación Inicial:* S/ ${plan.setupPrice}`,
    addonsListText,
    `💰 *Monto Inicial a Pagar:* S/ ${totalInicial}`,
    ``,
    `📍 Deseo activar mi catálogo con subdominio y pedidos por WhatsApp. ¿Cuáles son los pasos a seguir?`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/51941663265?text=${encodeURIComponent(mensaje)}`;
}
