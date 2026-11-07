# Plan de Implementación: Alineación de Oferta, Precios Oficiales y Playbook de Ventas en Campo — Qatu Web

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alinear la web pública de Qatu Web (`/`, `/planes`, `/para-tu-negocio`, y demos) con la propuesta oficial de SaaS no tradicional de bajo costo marginal para Ayacucho (Plan Anual S/ 300 con instalación gratis, Plan Mensual S/ 30 + S/ 90 de alta, 3 módulos adicionales de cuota fija, cotizador interactivo a WhatsApp y playbook de ventas en campo con guiones de 3 minutos).

**Architecture:** Fuente única de verdad tipada en `src/lib/config/pricing.ts`, componente reusable de cotizador interactivo `InteractivePricingCalculator.tsx` con generación de URLs de WhatsApp a `wa.me/51941663265`, actualización modular de la Home (`MarketingHome.tsx`), página de tarifas (`/planes`), tabla comparativa (`ComparisonTable.tsx`), página editorial de activación (`/para-tu-negocio`), y guía de ventas en campo en `docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React.

## Global Constraints
- WhatsApp Oficial: `+51 941 663 265` (`51941663265`).
- Yape / Plin Oficial: `941 663 265` (Titular: `Luis Gerardo Llocclla Sauñe`).
- Plan Mensual: S/ 30 / mes + S/ 90 pago único de activación inicial (carga de 25 productos).
- Plan Anual Recomendado: S/ 300 / año (S/ 25/mes) con activación e instalación 100% GRATIS (S/ 0).
- Módulos Adicionales (pago único): Carta QR Mesas (+S/ 70), Inventario Alertas (+S/ 90), Lector DNI (+S/ 150).
- Verticales oficiales: `/demo/calzados`, `/demo/pasteleria`, `/demo/gym`.
- Subdominios oficiales: `*.qatuweb.com`.
- Mobile-first: todo debe operar nítido en pantallas de celular (360px a 414px) bajo la luz del sol.

---

### Task 1: Crear Configuración Centralizada de Precios, Módulos y Verticales (`src/lib/config/pricing.ts`)

**Files:**
- Create: `src/lib/config/pricing.ts`
- Modify: `src/lib/seed/initialBusinesses.ts`

**Interfaces:**
- Produces:
  - `OFFICIAL_PRICING_PLANS`: Lista de los 2 planes base (`mensual` y `anual`) con tipos `PricingPlanConfig`.
  - `OFFICIAL_ADDONS`: Lista de los 3 módulos adicionales (`addon-mesas`, `addon-inventario`, `addon-dni`).
  - `OFFICIAL_VERTICALS`: Metadata de las 3 verticales de demo (`calzados`, `pasteleria`, `gym`) con su dolor de negocio y upsell asociado.
  - `LAUNCH_PROMO_CONFIG`: Configuración de la oferta de 30 cupos congelando tarifa a S/ 300 de por vida.
  - `buildPricingWhatsAppUrl(planId, selectedAddonIds)`: Función generadora del enlace con texto ordenado.

- [ ] **Step 1: Crear el archivo `src/lib/config/pricing.ts`**

Escribir la configuración tipada completa:
```typescript
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
```

- [ ] **Step 2: Sincronizar `src/lib/seed/initialBusinesses.ts`**

Verificar que `initialPricingPlans` en `src/lib/seed/initialBusinesses.ts` mantenga consistencia con los 25 productos y datos oficiales para no romper ningún componente legado.

- [ ] **Step 3: Ejecutar verificación de tipos TypeScript**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit de Task 1**

Run:
```bash
git add src/lib/config/pricing.ts src/lib/seed/initialBusinesses.ts
git commit -m "feat(pricing): add centralized pricing, addons and demo verticals config"
```

---

### Task 2: Construir el Componente Cotizador Interactivo de Módulos (`InteractivePricingCalculator.tsx`)

**Files:**
- Create: `src/components/pricing/InteractivePricingCalculator.tsx`

**Interfaces:**
- Consumes:
  - `OFFICIAL_PRICING_PLANS`, `OFFICIAL_ADDONS`, `buildPricingWhatsAppUrl` from `@/lib/config/pricing`.
- Produces:
  - React Component `<InteractivePricingCalculator defaultPlanId="anual" showDetails={true} />`.
  - Permite alternar entre Plan Anual y Plan Mensual.
  - Permite marcar y desmarcar los 3 Módulos Adicionales (Mesas +S/ 70, Inventario +S/ 90, Lector DNI +S/ 150).
  - Calcula en tiempo real el monto inicial y muestra el ahorro.
  - Botón táctil para celulares que abre WhatsApp con el desglose exacto.

- [ ] **Step 1: Crear `src/components/pricing/InteractivePricingCalculator.tsx`**

Implementar el componente con estados de React (`useState`), checkboxes accesibles, badges de colores (verde esmeralda, dorado, pizarra) y diseño adaptado a pantallas táctiles.

- [ ] **Step 2: Probar el cálculo reactivo y la generación de URL**

Verificar que:
- Seleccionar Plan Anual da S/ 300 base con "Instalación Gratis".
- Seleccionar Plan Mensual da S/ 120 base (S/ 90 alta + S/ 30 primer mes).
- Al sumar Módulo DNI (+S/ 150), el total anual pasa a S/ 450 y el botón de WhatsApp incluye el módulo.

- [ ] **Step 3: Ejecutar compilación y lint**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit de Task 2**

Run:
```bash
git add src/components/pricing/InteractivePricingCalculator.tsx
git commit -m "feat(pricing): implement interactive pricing and addon calculator"
```

---

### Task 3: Actualizar la Home Pública (`src/components/home/MarketingHome.tsx`)

**Files:**
- Modify: `src/components/home/MarketingHome.tsx`

**Changes:**
1. **Hero Principal:**
   - H1: *"Tu tienda virtual o carta digital por S/ 1 al día. Sin comisiones. Lista en 48 horas."*
   - Subtítulo enfocado en la realidad de Huamanga: *"Olvídate de agencias que cobran S/ 2,500 y demoran meses o apps que te cobran comisiones por cada venta. En Qatu Web tu catálogo corre en tu propio subdominio en el Edge y los pedidos te llegan ordenados a tu WhatsApp."*
   - Cintillo de lanzamiento: *"🔥 Cupos de Lanzamiento: Los primeros 30 negocios de Ayacucho congelan el precio de S/ 300 al año para siempre"* (con contador visual `9 de 30 cupos reservados`).
2. **Tres Ganchos Comerciales Clave:**
   - "No pagas por cada venta: pagas lo mismo venda poco o mucho."
   - "Mira cómo quedaría tu negocio antes de pagar con el simulador y demos en vivo."
   - "El pedido te llega ordenado al WhatsApp con talla, porción o color."
3. **Sección de Demos y Panel de Bolsillo:**
   - Presentar las 3 verticales (`/demo/calzados`, `/demo/pasteleria`, `/demo/gym`) destacando el dolor específico de cada rubro y su upsell natural.
   - Enlace directo a probar el Panel de Bolsillo (`/demo/[rubro]/admin`) para simular apagar un producto agotado.
4. **Sección de Precios:**
   - Reemplazar las tarjetas anteriores integrando `InteractivePricingCalculator`.
5. **Preguntas Frecuentes (FAQ):**
   - Incorporar la respuesta transparente de pago a Yape/Plin `941 663 265` a nombre de `Luis Gerardo Llocclla Sauñe (Qatu Web)`, el funcionamiento del Kill-Switch preventivo y la ausencia total de comisiones.

- [ ] **Step 1: Aplicar las modificaciones en `MarketingHome.tsx`**
- [ ] **Step 2: Verificar la renderización en el navegador y tipos de TypeScript**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Commit de Task 3**

Run:
```bash
git add src/components/home/MarketingHome.tsx
git commit -m "feat(home): align hero, launch promo, verticals upsell and interactive pricing"
```

---

### Task 4: Actualizar Página de Tarifas (`src/app/planes/page.tsx` y `ComparisonTable.tsx`)

**Files:**
- Modify: `src/app/planes/page.tsx`
- Modify: `src/components/pricing/ComparisonTable.tsx`

**Changes:**
1. **Estructura de Planes:**
   - Presentar los 2 Planes Principales: **Plan Mensual (S/ 30/mes + S/ 90 setup)** y **Plan Anual Recomendado (S/ 300/año, Setup GRATIS)**.
   - Integrar el banner de los 30 cupos de congelamiento de precio de por vida.
2. **Sección de Módulos Especiales Adicionales:**
   - Mostrar los 3 módulos (+S/ 70, +S/ 90, +S/ 150) con su explicación detallada, rubro ideal y botón interactivo.
3. **Tabla Comparativa Actualizada:**
   - Comparar: Plan Mensual vs Plan Anual Recomendado frente a Agencia Tradicional y Plataformas Internacionales.

- [ ] **Step 1: Modificar `src/app/planes/page.tsx`**
- [ ] **Step 2: Actualizar `src/components/pricing/ComparisonTable.tsx`**
- [ ] **Step 3: Probar renderizado y verificación de tipos**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit de Task 4**

Run:
```bash
git add src/app/planes/page.tsx src/components/pricing/ComparisonTable.tsx
git commit -m "feat(planes): streamline pricing page with 2 plans, addons grid and comparison table"
```

---

### Task 5: Actualizar Proceso y Activación en `/para-tu-negocio` (`ProcessTimeline.tsx`)

**Files:**
- Modify: `src/app/para-tu-negocio/page.tsx`
- Modify: `src/components/onboarding/ProcessTimeline.tsx`

**Changes:**
1. Reemplazar los 4 pasos antiguos por el Proceso Oficial de 4 Pasos:
   - **Paso 01: Demostración en vivo con tu nombre** (probando `/demo/[rubro]` y el Panel de Bolsillo `/admin` en tu celular).
   - **Paso 02: Cierre comercial y elección de plan** (Plan Anual S/ 300 con instalación gratis o Plan Mensual S/ 30 + S/ 90).
   - **Paso 03: Pago y validación transparente** (Transferencia Yape/Plin al 941 663 265 a nombre de Luis Gerardo Llocclla Sauñe y subida de comprobante en `/dashboard/cliente`).
   - **Paso 04: Aprobación en 1-Toque** (Validación en el Command Center `/dashboard/admin`, activación automática en el Edge y web lista en 24 a 48 horas).
2. Resaltar la confianza local y el soporte en Huamanga.

- [ ] **Step 1: Actualizar `ProcessTimeline.tsx`**
- [ ] **Step 2: Actualizar `src/app/para-tu-negocio/page.tsx`**
- [ ] **Step 3: Verificar tipos y diseño**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit de Task 5**

Run:
```bash
git add src/components/onboarding/ProcessTimeline.tsx src/app/para-tu-negocio/page.tsx
git commit -m "feat(onboarding): replace process timeline with official 4-step sales and activation flow"
```

---

### Task 6: Crear el Playbook de Ventas en Campo (`docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md`)

**Files:**
- Create: `docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md`

**Content:**
- Guía de prospección en campo para Ayacucho:
  - Objetivos numéricos: 2 demos/día laborable (40-50 al mes) ➔ 10 cierres mensuales (S/ 3,000/mes).
  - Guion paso a paso de 3 minutos para **Calzado y Boutiques** (Jr. Asamblea, mercados).
  - Guion paso a paso de 3 minutos para **Restaurantes y Pastelerías** (Plaza Mayor, Jr. Bellido).
  - Guion paso a paso de 3 minutos para **Gimnasios y Centros Fitness** (Av. Mariscal Cáceres, Independencia).
  - Guion para el efecto 'Wow' del Panel de Bolsillo `/admin`.
  - Respuestas rápidas a objeciones frecuentes en Huamanga.
  - Mensaje base de WhatsApp para prospección y seguimiento.

- [ ] **Step 1: Redactar `docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md`**
- [ ] **Step 2: Commit de Task 6**

Run:
```bash
git add docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md
git commit -m "docs(ventas): add field demo scripts and ayacucho sales playbook"
```

---

### Task 7: Verificación Global, Build de Producción y Previews

- [ ] **Step 1: Ejecutar verificación completa de TypeScript**
  Run: `npx tsc --noEmit`
  Expected: 0 errors.

- [ ] **Step 2: Ejecutar el build de Next.js**
  Run: `npm run build`
  Expected: Build exitoso sin errores en páginas estáticas ni dinámicas.

- [ ] **Step 3: Validar enlaces y consistencia de precios**
  - Comprobar que en `/`, `/planes`, y `/para-tu-negocio` todos los precios indiquen S/ 30, S/ 90, S/ 300, S/ 70, S/ 90, S/ 150.
  - Comprobar que el teléfono sea 941 663 265 y el titular Luis Gerardo Llocclla Sauñe.
