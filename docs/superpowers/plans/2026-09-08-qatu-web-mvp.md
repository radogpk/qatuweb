# QATU.PE MVP Web Principal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la web principal de la plataforma Qatu (qatu.pe), que opera como landing comercial para captar nuevos negocios y vitrina/directorio digital destacando los negocios piloto (Las Flores y Hotel Umaru).

**Architecture:** Aplicación Next.js 15 (App Router) en TypeScript con Tailwind CSS utilizando el sistema de marca andino ayacuchano (Crudo, Rojo Ayacuchano, Dorado Qori, Índigo Andino; fuentes Fraunces e Inter). Capa de datos desacoplada mediante patrón Repository con fallback automático a datos tipados locales y soporte directo para Supabase.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Supabase Client (`@supabase/supabase-js`).

## Global Constraints
- Colores obligatorios: Hueso/Crudo `#F5EFE4`, Rojo Ayacuchano `#B23A2E`, Dorado Qori `#D4A017`, Índigo Andino `#2B3A55`.
- Tipografías: Fraunces (serif para títulos), Inter (sans para cuerpo e interfaz).
- Enlaces a subdominios de negocios deben abrir en la misma pestaña (`target="_self"`).
- Resiliencia de datos: la web debe compilar y funcionar plenamente sin requerir conexión activa a Supabase.
- Mobile-first: diseño y componentes 100% adaptados a pantallas de celulares.

---

### Task 1: Scaffolding del Proyecto y Sistema de Diseño

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/lib/config/site.ts`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/WhatsAppFloat.tsx`

**Interfaces:**
- Produces: `siteConfig` (nombre, descripción, navegación, whatsappUrl, socialLinks), componente global `Navbar`, `Footer`, `WhatsAppFloat`

- [ ] **Step 1: Inicializar dependencias en package.json y configuración base**
Instalar `next`, `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `@supabase/supabase-js`, y configurar `tailwind.config.ts` con los colores y fuentes exactas.

- [ ] **Step 2: Configurar globals.css con variables CSS y tema de color**
Definir tokens de colores: `--bg-crudo: #F5EFE4`, `--color-rojo: #B23A2E`, `--color-qori: #D4A017`, `--color-indigo: #2B3A55`.

- [ ] **Step 3: Implementar layout.tsx, Navbar y Footer responsivos**
Incorporar Google Fonts (`Fraunces` e `Inter`), Navbar con logo wordmark "Qatu.pe", enlaces de navegación (`Directorio`, `Planes`, `Para tu negocio`, `Nosotros`, `Contacto`), botón CTA "Quiero mi web", y menú hamburguesa para móviles. Footer completo con datos de contacto, enlaces legales y marca de origen en Ayacucho.

- [ ] **Step 4: Verificar compilación inicial con `npm run build` o lint**
Comprobar que el layout compila sin errores.

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: scaffold next.js app with brand design system and base layout"
```

---

### Task 2: Capa de Datos, Modelo de Negocios y Script de Supabase

**Files:**
- Create: `src/lib/types/business.ts`
- Create: `src/lib/seed/initialBusinesses.ts`
- Create: `src/lib/data/businesses.repo.ts`
- Create: `src/lib/supabase/client.ts`
- Create: `supabase/schema.sql`

**Interfaces:**
- Produces: `Business`, `Lead`, `PricingPlan`, función `getBusinesses()`, función `getBusinessBySlug()`, función `getFeaturedBusinesses()`, función `saveLead()`.

- [ ] **Step 1: Escribir tipos TypeScript (`src/lib/types/business.ts`)**
Definir interfaces estrictas para `Business`, `Lead`, `PricingPlan`, `BusinessCategory`.

- [ ] **Step 2: Crear seed local con negocios piloto (`src/lib/seed/initialBusinesses.ts`)**
Incluir datos completos y reales para **Las Flores** (Florería y regalos, `lasflores.qatu.pe`, Ayacucho) y **Hotel Umaru** (Hospedaje boutique, `hotelumaru.qatu.pe`, Ayacucho), con fotos, categorías, descripciones, teléfonos y tags.

- [ ] **Step 3: Implementar el repositorio de datos (`src/lib/data/businesses.repo.ts`)**
Crear métodos asíncronos `getBusinesses()` y `getFeaturedBusinesses()` que consulten Supabase si `process.env.NEXT_PUBLIC_SUPABASE_URL` existe, y devuelvan `initialBusinesses` de forma transparente ante cualquier error o ausencia de credenciales.

- [ ] **Step 4: Escribir el script SQL para Supabase (`supabase/schema.sql`)**
Declarar tablas `negocios` y `leads`, índices, políticas RLS para lectura pública de negocios activos e inserción pública de leads, e inserciones iniciales.

- [ ] **Step 5: Commit**
```bash
git add src/lib/types src/lib/seed src/lib/data src/lib/supabase supabase/schema.sql
git commit -m "feat: implement data layer, business models and supabase repository with fallback"
```

---

### Task 3: Home Page (`/`) — Vitrina Comercial y Captación

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/StepsSection.tsx`
- Create: `src/components/home/FeaturedGrid.tsx`
- Create: `src/components/home/PricingPreview.tsx`
- Create: `src/components/home/TestimonialsSection.tsx`
- Create: `src/components/home/QuickContactSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getFeaturedBusinesses()`, `siteConfig`
- Produces: Componente de página principal rica con todos los bloques de la especificación.

- [ ] **Step 1: Implementar HeroSection**
Titular *"Tu puesto en el mercado digital del Perú"*, subtítulo de propuesta de valor (sin fricción técnica), CTA principal "Quiero mi web" (scroll suave o WhatsApp directo) y CTA secundario "Ver negocios" que ancla a la vitrina.

- [ ] **Step 2: Implementar StepsSection (Cómo funciona)**
4 pasos claros: 1. Nos cuentas tu negocio → 2. Diseñamos tu web a medida → 3. Publicamos en tu subdominio → 4. Tú vendes, nosotros mantenemos.

- [ ] **Step 3: Implementar FeaturedGrid con tarjetas de Las Flores y Hotel Umaru**
Mostrar tarjetas con imagen de portada, avatar/logo, badge de categoría, ubicación en Ayacucho, descripción, enlace a su subdominio (`_self`) y botón "Ver todos los negocios" hacia `/directorio`.

- [ ] **Step 4: Implementar PricingPreview, Testimonios y QuickContactSection**
Muestra de los 3 planes de precio (Informativa S/35/mes, Comercio S/55/mes, Reservas S/75/mes), testimonios de los negocios piloto, y formulario rápido de contacto conectado con acción a WhatsApp.

- [ ] **Step 5: Ensamblar `src/app/page.tsx` y verificar responsividad móvil**
Probar visualmente la Home completa.

- [ ] **Step 6: Commit**
```bash
git add src/components/home src/app/page.tsx
git commit -m "feat: implement home page with hero, vitrina destacada, steps and pricing preview"
```

---

### Task 4: Directorio Completo y Buscador (`/directorio`)

**Files:**
- Create: `src/components/directory/BusinessCard.tsx`
- Create: `src/components/directory/DirectoryDirectoryView.tsx`
- Create: `src/components/directory/BusinessJsonLd.tsx`
- Create: `src/app/directorio/page.tsx`

**Interfaces:**
- Consumes: `getBusinesses()`
- Produces: Página interactiva del directorio con búsqueda y filtrado instantáneo.

- [ ] **Step 1: Implementar BusinessCard con metadatos y enlaces**
Diseño de tarjeta con badge de categoría, foto representativa, descripción, botones de contacto directo y botón principal "Visitar web (subdominio.qatu.pe)" en la misma pestaña.

- [ ] **Step 2: Implementar DirectoryDirectoryView con estado interactivo**
Barra de búsqueda en tiempo real (por nombre, rubro o tags), selector de categorías (Todos, Restaurantes, Hoteles, Tiendas, Servicios, Artesanía), contador dinámico de resultados y estado vacío cuando no haya coincidencias.

- [ ] **Step 3: Implementar BusinessJsonLd (Schema.org)**
Generación de microdatos `schema.org/LocalBusiness` con nombre, subdominio, categoría y ciudad para cada negocio listado.

- [ ] **Step 4: Ensamblar `src/app/directorio/page.tsx` y probar filtros**
Probar búsqueda por "flores", "hotel", "ayacucho" y verificar transiciones suaves.

- [ ] **Step 5: Commit**
```bash
git add src/components/directory src/app/directorio
git commit -m "feat: implement complete searchable directory with localbusiness schema"
```

---

### Task 5: Páginas Comerciales: Planes (`/planes`) y Para tu Negocio (`/para-tu-negocio`)

**Files:**
- Create: `src/components/pricing/PricingCard.tsx`
- Create: `src/components/pricing/ComparisonTable.tsx`
- Create: `src/app/planes/page.tsx`
- Create: `src/components/onboarding/ProcessTimeline.tsx`
- Create: `src/components/onboarding/AccordionFaq.tsx`
- Create: `src/app/para-tu-negocio/page.tsx`

**Interfaces:**
- Produces: Páginas `/planes` y `/para-tu-negocio` con información comercial detallada y acordeón interactivo de preguntas frecuentes.

- [ ] **Step 1: Implementar `/planes/page.tsx`**
Tarjetas de los 3 planes detallando setup inicial vs renta mensual, tiempos de entrega, y tabla comparativa completa con checks de características. Botones de acción directa con mensaje de WhatsApp personalizado por plan.

- [ ] **Step 2: Implementar `/para-tu-negocio/page.tsx`**
Línea de tiempo del proceso de onboarding para dueños de negocios (qué material entregar, plazos, revisión previa).

- [ ] **Step 3: Implementar AccordionFaq interactivo**
Acordeón con las 4 preguntas clave de la especificación (mensualidad, dominio propio, propiedad de datos, cambios posteriores).

- [ ] **Step 4: Probar interactividad del acordeón y enlaces en móvil**
Verificar legibilidad y usabilidad táctil.

- [ ] **Step 5: Commit**
```bash
git add src/components/pricing src/components/onboarding src/app/planes src/app/para-tu-negocio
git commit -m "feat: implement detailed pricing plans and business onboarding FAQ pages"
```

---

### Task 6: Sobre Nosotros (`/nosotros`) y Contacto (`/contacto`)

**Files:**
- Create: `src/app/nosotros/page.tsx`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/DirectWhatsAppCard.tsx`
- Create: `src/app/contacto/page.tsx`
- Create: `src/app/actions/lead.ts`

**Interfaces:**
- Consumes: `siteConfig`, `saveLead()`
- Produces: Páginas institucionales y de conversión con formulario Server Action.

- [ ] **Step 1: Implementar `/nosotros/page.tsx`**
Historia de Qatu, misión de digitalizar el comercio local en Ayacucho y Perú, presentación del equipo de 3 fundadores/desarrolladores y valores de cercanía y soporte humano.

- [ ] **Step 2: Implementar Server Action `src/app/actions/lead.ts`**
Validación de datos del formulario (nombre, negocio, rubro, teléfono, mensaje) y almacenamiento seguro en Supabase si está disponible.

- [ ] **Step 3: Implementar ContactForm con feedback visual y enlace a WhatsApp**
Formulario con estados de carga, confirmación y botón directo para continuar la conversación por WhatsApp con los datos ya completados.

- [ ] **Step 4: Implementar DirectWhatsAppCard y datos de contacto en `/contacto`**
Tarjetas con enlaces a WhatsApp Business, correo de contacto y sede en Ayacucho.

- [ ] **Step 5: Commit**
```bash
git add src/app/nosotros src/app/contacto src/components/contact src/app/actions
git commit -m "feat: implement about us story page and lead contact form with server actions"
```

---

### Task 7: SEO Global, Verificación Integral y Build Final

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (OpenGraph, Twitter Cards, canonical URL)

- [ ] **Step 1: Configurar sitemap.ts y robots.ts**
Generar sitemap dinámico que incluya `/`, `/directorio`, `/planes`, `/para-tu-negocio`, `/nosotros`, `/contacto`.

- [ ] **Step 2: Ejecutar verificación de compilación completa**
Ejecutar `npm run build` y corroborar que no haya ningún error de tipos o lint.

- [ ] **Step 3: Validar navegación integral de todas las rutas y botones**
Probar cada link del navbar, footer, tarjetas de negocio, botones de WhatsApp y formularios.

- [ ] **Step 4: Commit final del MVP**
```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx
git commit -m "feat: complete seo metadata, sitemap and full platform verification"
```
