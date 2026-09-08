# Especificación de Diseño Técnico: QATU.PE (MVP Web Principal)

**Fecha:** 2026-09-08  
**Estado:** Aprobado para Planificación e Implementación  
**Alcance:** Portal web principal `qatu.pe` (Landing comercial + Vitrina/Directorio de negocios piloto).

---

## 1. Resumen Ejecutivo y Propósito

**Qatu** es una plataforma web que funciona como mercado digital para negocios peruanos. Cada negocio cliente obtiene su propio subdominio (`negocio.qatu.pe`) con una web a medida mantenida y alojada por Qatu.

La web principal (`qatu.pe`) cumple dos funciones esenciales en este MVP:
1. **Vitrina / Directorio:** Exponer y dar visibilidad a los negocios activos, impulsando el descubrimiento local y generando tráfico cruzado (iniciando con los pilotos **Las Flores** y **Hotel Umaru**).
2. **Landing Comercial y Captación de Leads:** Comunicar en menos de 10 segundos el valor de Qatu para dueños de negocios locales (sin fricción técnica), explicar planes/precios y convertir visitas en contactos por formulario y WhatsApp Business.

---

## 2. Sistema de Diseño e Identidad de Marca

### 2.1 Paleta de Colores
* **Fondo Dominante (Crudo / Hueso):** `#F5EFE4` — Aporta calidez artesanal y sensación orgánica de mercado. Fondos de tarjetas en `#FFFFFF` o `#FAF6F0`.
* **Color de Marca & CTAs (Rojo Ayacuchano):** `#B23A2E` (hover: `#962E24`) — Destaca las llamadas a la acción primarias y la identidad visual de origen.
* **Acentos & Precios (Dorado Qori):** `#D4A017` — Insignias de recomendación, números de planes y detalles de alto valor.
* **Textos Principales & Footer (Índigo Andino):** `#2B3A55` (texto secundario: `#4A5B78`) — Máximo contraste y elegancia para lectura.

### 2.2 Tipografía
* **Títulos (`font-serif`):** *Fraunces* (Google Font) — Carácter editorial, cálido y artesanal.
* **Cuerpo e Interfaz (`font-sans`):** *Inter* (Google Font) — Legibilidad limpia y neutral en dispositivos móviles.

### 2.3 Criterios de Diseño
* **Mobile-First:** Optimizado prioritariamente para teléfonos móviles donde navega la mayoría de dueños de negocios y clientes en Ayacucho.
* **Imágenes Reales:** Fotografías representativas de locales y productos reales, evitando clichés artificiales.

---

## 3. Arquitectura del Sistema y Rutas

### 3.1 Stack Tecnológico
* **Framework Frontend:** Next.js 15+ (App Router) con TypeScript.
* **Estilos:** Tailwind CSS v3 / v4 con tokens de marca semánticos.
* **Iconografía:** Lucide React.
* **Backend & Base de Datos:** Supabase (PostgreSQL para tablas `negocios` y `leads`).
* **Despliegue:** Vercel (con wildcard `*.qatu.pe` configurado).

### 3.2 Mapa de Rutas
| Ruta | Propósito | Componentes Clave |
|---|---|---|
| `/` | Portada comercial y vitrina de entrada | Hero, Steps, FeaturedGrid, PricingPreview, Testimonials, QuickContact, Footer |
| `/directorio` | Directorio completo filtrable y buscador | SearchBar, CategoryFilter, CityFilter, BusinessCardGrid, LocalBusinessSchema |
| `/planes` | Comparativa detallada de planes y precios | PlanCards, FeatureComparisonTable, PlanFAQPreview |
| `/para-tu-negocio` | Guía de onboarding y preguntas frecuentes | ProcessTimeline, RequirementsChecklist, AccordionFAQ |
| `/nosotros` | Historia, propósito y equipo fundador | StorySection, ValuesGrid, TeamSection (3 miembros), AyacuchoRoots |
| `/contacto` | Captación y canales directos | ContactForm (Server Action), WhatsAppDirectCard, OfficeInfo |

---

## 4. Capa de Datos y Modelos

### 4.1 Tipos TypeScript Principales (`src/lib/types/business.ts`)

```typescript
export type BusinessCategory = 'restaurante' | 'hotel' | 'tienda' | 'servicios' | 'artesania';

export interface Business {
  id: string;
  slug: string;
  name: string;
  subdomain: string; // ej: "lasflores.qatu.pe"
  category: BusinessCategory;
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
  badge?: string;
  popular?: boolean;
  setupPrice: number;
  monthlyPrice: number;
  description: string;
  features: string[];
  ctaText: string;
}
```

### 4.2 Repositorio con Fallback Desacoplado (`src/lib/data/businesses.repo.ts`)
* Función `getBusinesses()`:
  - Evalúa si `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están presentes.
  - En caso afirmativo, consulta la tabla `negocios`.
  - En caso negativo o ante error de red, retorna la colección local tipada `initialBusinesses` con **Las Flores** (Florería y Regalos) y **Hotel Umaru** (Hospedaje Boutique), garantizando disponibilidad inmediata sin bloquear el desarrollo.
* Apertura de subdominios: Los enlaces de tarjetas dirigen a `https://${business.subdomain}` abriendo en la misma pestaña (`target="_self"`), preservando la experiencia integrada del ecosistema Qatu.

---

## 5. Esquema de Base de Datos Supabase (`supabase/schema.sql`)

```sql
-- Tabla de Negocios para el Directorio
create table if not exists public.negocios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subdomain text unique not null,
  category text not null,
  city text not null default 'Ayacucho',
  short_description text not null,
  long_description text,
  logo_url text not null,
  cover_url text not null,
  featured boolean default false,
  active boolean default true,
  address text,
  phone text,
  whatsapp text,
  instagram text,
  tags text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Tabla de Leads de Contacto
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text not null,
  category text,
  phone text not null,
  interested_plan text,
  message text,
  created_at timestamp with time zone default now()
);

-- Políticas RLS
alter table public.negocios enable row level security;
alter table public.leads enable row level security;

create policy "Negocios activos visibles públicamente" 
  on public.negocios for select using (active = true);

create policy "Cualquiera puede registrar un lead" 
  on public.leads for insert with check (true);
```

---

## 6. Planes Comerciales Definidos

1. **Web Informativa:**
   - Setup: S/ 250 (pago único de diseño, redacción y configuración).
   - Mensualidad: S/ 35 / mes (hosting rápido, subdominio SSL, soporte y cambios menores).
   - Incluye: Menú / catálogo digital, ubicación en Google Maps, botón directo a WhatsApp, enlace en el directorio Qatu.
2. **Comercio Básico (Más Popular):**
   - Setup: S/ 450 (diseño de catálogo interactivo hasta 30 productos con pedidos directos).
   - Mensualidad: S/ 55 / mes (mantenimiento continuo, actualizaciones de catálogo).
   - Incluye: Carrito con pedido directo formateado a WhatsApp, links de pago Yape/Plin, optimización SEO local.
3. **Comercio + Reservas:**
   - Setup: S/ 650 (solución para hoteles, restaurantes o servicios profesionales).
   - Mensualidad: S/ 75 / mes.
   - Incluye: Módulo de reservas / citas por WhatsApp o formulario con confirmación, galería fotográfica avanzada.

---

## 7. Preguntas Frecuentes Clave (FAQ)

* **¿Pierdo mi web si dejo de pagar la mensualidad?**  
  La web se pausa en el subdominio si se suspende la mensualidad, pero el diseño y todo tu contenido quedan resguardados para reactivarse cuando desees sin volver a pagar el setup.
* **¿Puedo tener mi propio dominio (.com o .pe) en lugar del subdominio?**  
  Sí, podemos vincular tu propio dominio cuando lo decidas manteniendo la infraestructura de Qatu.
* **¿Qué pasa con mis fotos y datos?**  
  Te pertenecen al 100%. Qatu solo actúa como proveedor técnico de tu presencia web.
* **¿Cómo solicito cambios de precios o productos?**  
  Escribes directamente a nuestro canal de soporte de WhatsApp y el equipo aplica tus cambios en menos de 24-48 horas.

---

## 8. Estrategia de Verificación y Criterios de Éxito

1. **Compilación y Linteo:** `npm run build` sin errores tipográficos o de sintaxis.
2. **Navegación Móvil y Escritorio:** Todas las rutas cargan con el header, footer y paleta oficial (`#F5EFE4`, `#B23A2E`, `#D4A017`, `#2B3A55`).
3. **Filtros del Directorio:** Búsqueda en vivo y cambio de pestañas de categoría sin recarga de página.
4. **Formulario y Enlace WhatsApp:** Validación de campos obligatorios y apertura correcta de enlace `wa.me` con mensaje prellenado.
5. **SEO:** Inserción de JSON-LD estructurado `LocalBusiness` en tarjetas y metadatos por página.
