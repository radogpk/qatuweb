# Diseño de Alineación Comercial, Precios Oficiales y Playbook de Ventas en Campo — Qatu Web

- **Fecha:** 2026-11-07
- **Estado:** Validado y Aprobado
- **Autor:** Antigravity & Luis Gerardo Llocclla Sauñe (Qatu Web)

---

## 1. Resumen Ejecutivo y Propósito

Qatu Web es el primer SaaS no tradicional de ingeniería de software enfocado en pequeños y medianos comercios de Ayacucho (calzados, boutiques, gastronomía, pastelerías, gimnasios y negocios locales).

A diferencia de las agencias tradicionales (que cobran entre S/ 1,500 y S/ 2,500 y tardan 30 a 60 días) o de las plataformas enlatadas extranjeras (que cobran comisiones por cada venta y requieren conocimientos avanzados), Qatu Web entrega infraestructura aislada en Supabase y Cloudflare Edge (`*.qatuweb.com`), un Panel de Bolsillo móvil ultra-rápido (`/admin`), comanda estructurada directa a WhatsApp con **0% de comisión por venta** y un Kill-Switch de borde seguro.

Este diseño alinea toda la presencia pública de Qatu Web (`/`, `/planes`, `/para-tu-negocio`, y demos) con el modelo económico real de volumen (S/ 1 al día, Plan Anual a S/ 300 con instalación GRATIS, Plan Mensual de S/ 30 + S/ 90 de alta, y 3 Módulos Especiales de pago único) e incorpora la estrategia de ventas en campo para Huamanga con guiones de 3 minutos por vertical.

---

## 2. Arquitectura de Datos y Fuente de Verdad (`src/lib/config/pricing.ts`)

Para evitar divergencias entre páginas y componentes, se centraliza la configuración comercial en `src/lib/config/pricing.ts`:

### 2.1. Identidad de Pago y Contacto Oficial
- **WhatsApp Business Oficial:** `+51 941 663 265` (`51941663265`)
- **Yape / Plin:** `941 663 265`
- **Titular de la Cuenta:** `Luis Gerardo Llocclla Sauñe (Qatu Web)`
- **Esquema de Subdominios:** `tunegocio.qatuweb.com`

### 2.2. Planes de Suscripción Oficiales
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
  whatsappMessage: string;
}
```

- **Plan Mensual:**
  - `periodicPrice`: S/ 30 / mes (S/ 1 al día)
  - `setupPrice`: S/ 90 (pago único inicial de alta, configuración de infraestructura aislada y carga de los primeros 25 productos)
  - `deliveryDays`: "24 a 48 horas"
  - `features`:
    - Subdominio seguro `tunegocio.qatuweb.com`
    - Catálogo móvil táctil adaptado a tu identidad
    - Panel de Bolsillo móvil (`/admin`) para apagar agotados en 1 toque
    - Comanda estructurada directa al WhatsApp de tu negocio
    - 0% de comisiones por venta
    - Carga inicial de tus primeros 25 productos

- **Plan Anual Recomendado (Héroe Comercial):**
  - `periodicPrice`: S/ 300 / año (equivalente a S/ 25/mes o S/ 1 al día)
  - `setupPrice`: S/ 0 (**Instalación 100% GRATIS**, ahorro de S/ 90)
  - `savingsNote`: "Ahorras 2 meses de suscripción + S/ 90 de activación gratis"
  - `deliveryDays`: "24 horas prioritario"
  - `features`:
    - Todo lo del Plan Mensual cubierto por 12 meses completos
    - Instalación y carga de 25 productos 100% GRATIS
    - Congelamiento de tarifa anual de por vida (primeros 30 cupos)
    - Generación de código QR de alta resolución para mostrador o mesas
    - Prioridad de soporte VIP por WhatsApp
    - Opción de conectar dominio propio (.com o .pe)

### 2.3. Módulos Especiales Adicionales (Pago Único, Cuota Fija)
No alteran la mensualidad recurrente (se mantiene fija en S/ 30/mes o S/ 300/año):
1. **Carta QR avanzada con gestión de mesas y mozos (`addon-mesas`):** +S/ 70
2. **Control de inventario avanzado con alertas a WhatsApp (`addon-inventario`):** +S/ 90
3. **Integración con lector de DNI / códigos de barras (`addon-dni`):** +S/ 150

### 2.4. Verticales Oficiales de Demostración
- `/demo/calzados`: Calzados Lucas (Comercio, Calzado & Boutiques, Jr. Asamblea 245). Upsell natural: Inventario (+S/ 90).
- `/demo/pasteleria`: Restaurante & Pastelería Las Flores (Gastronomía & Carta QR, Jr. Bellido 180). Upsell natural: Mesas y mozos (+S/ 70).
- `/demo/gym`: Trankilandia Gym & Fitness (Membresías & Control DNI, Av. Mariscal Cáceres 540). Upsell natural: Lector de DNI (+S/ 150).

---

## 3. Experiencias Públicas de Usuario (Frontend UI/UX)

### 3.1. Página Principal (`MarketingHome.tsx`)
- **Hero & Hooks Comerciales:**
  - H1: *"Tu tienda virtual o carta digital por S/ 1 al día. Sin comisiones. Lista en 48 horas."*
  - Banner de Lanzamiento / Urgencia:
    - *"🔥 Cupos de Lanzamiento: Los primeros 30 negocios de Ayacucho congelan el precio de S/ 300 al año para siempre"* (con indicador visual de cupos tomados).
  - Tres argumentos de choque para el comerciante:
    1. *"No pagas por cada venta: pagas lo mismo venda poco o mucho (0% comisiones)."*
    2. *"El pedido te llega ordenado al WhatsApp con talla, color o porción."*
    3. *"Mira cómo quedaría tu negocio antes de pagar con nuestras demos en vivo."*
- **Vitrina de Demos:**
  - Acceso directo en 1 toque a `/demo/calzados`, `/demo/pasteleria`, y `/demo/gym`, mostrando claramente el dolor operativo y el módulo complementario de cada una.
  - Enlace al Panel de Bolsillo `/admin` en cada vertical para probar el apagado de stock en 1 toque.
- **Cotizador Interactivo de Planes y Módulos:**
  - Selector entre Plan Anual (recomendado) y Plan Mensual.
  - Checkboxes interactivos para sumar los módulos adicionales (+S/ 70, +S/ 90, +S/ 150).
  - Cálculo instantáneo del monto inicial y generación dinámica del botón de WhatsApp preconfigurado con el desglose exacto.
- **Comparativa con Agencias y Plataformas:**
  - Agencia tradicional (S/ 2,000, 45 días) vs Plataforma internacional (comisiones por venta) vs Qatu Web (S/ 1 al día, en tu celular, local en Huamanga).
- **FAQ:**
  - Actualización de las respuestas sobre métodos de pago (Yape/Plin al 941 663 265 a nombre de Luis Gerardo Llocclla Sauñe), proceso de activación y ausencia de comisiones.

### 3.2. Página de Tarifas (`src/app/planes/page.tsx` y `ComparisonTable.tsx`)
- **2 Tarjetas de Suscripción:** Plan Mensual y Plan Anual Recomendado con badges destacados de ahorro.
- **Sección de Módulos Especiales:** Presentación clara con su precio único de activación y funcionalidad.
- **Tabla Comparativa Detallada:** Filas actualizadas con soporte de hasta 25 productos iniciales incluidos, módulos opcionales y costos transparentes.

### 3.3. Página de Proceso y Acompañamiento (`src/app/para-tu-negocio/page.tsx` y `ProcessTimeline.tsx`)
Se reemplaza el texto genérico por el embudo y proceso real de 4 pasos:
1. **01. Demo en vivo con tu nombre:** Te mostramos cómo funciona en tu celular con productos reales de tu rubro antes de que pagues un solo sol.
2. **02. Cierre y elección de plan:** Eliges el Plan Anual (S/ 300 con instalación GRATIS) o el Plan Mensual (S/ 30 + S/ 90 de activación).
3. **03. Pago y validación transparente:** Transfieres por Yape o Plin al número oficial **941 663 265** (Titular: Luis Gerardo Llocclla Sauñe) y subes tu comprobante en tu portal de autogestión (`/dashboard/cliente`).
4. **04. Activación en 1-Toque:** El Super Admin verifica el comprobante desde el Command Center (`/dashboard/admin`), aprueba el pago y tu subdominio seguro queda activo en el Edge de Cloudflare en 24 a 48 horas.

---

## 4. Playbook y Guiones de Demo en Campo para Celular (`docs/ventas/GUION_DEMOS_CAMPO_AYACUCHO.md`)

Se crea una guía práctica de bolsillo para el equipo de ventas en Ayacucho que detalla:
- Métrica de embudo: 2 demos al día (40-50 al mes) ➔ 10 cierres mensuales (20-25% conversión).
- Guion específico para **Calzado & Boutiques** (Jr. Asamblea, mercados, galerías).
- Guion específico para **Restaurantes, Cafés & Pastelerías** (Plaza Mayor, Jr. Bellido, Jr. Callao).
- Guion específico para **Gimnasios & Centros Fitness** (Av. Mariscal Cáceres, Independencia).
- Manejo de objeciones comunes del comerciante ayacuchano (desconfianza digital, "¿quién me ayuda si no sé usarlo?", "¿por qué tan barato?").
- Mensaje base de WhatsApp para prospección fría y de referidos.

---

## 5. Criterios de Aceptación y Verificación

1. **Compilación y TypeScript:** `npm run build` o `npx tsc --noEmit` ejecuta sin ningún error de tipos.
2. **Consistencia de Precios:**
   - Plan Mensual siempre muestra S/ 30/mes y S/ 90 de activación.
   - Plan Anual siempre muestra S/ 300/año y S/ 0 de instalación (ahorras S/ 150 en total).
   - Módulos muestran: Mesas S/ 70, Inventario S/ 90, Lector DNI S/ 150.
3. **Generación de Enlaces de WhatsApp:**
   - Los botones de WhatsApp en Home y Planes generan URLs válidas a `wa.me/51941663265` con los textos codificados que desglosan el plan y los módulos seleccionados.
4. **Responsive Mobile:**
   - La visualización en pantallas de celular (360px - 414px) es fluida, con botones de fácil toque táctil, sin desbordamientos horizontales.
5. **Demos Activas:**
   - `/demo/calzados`, `/demo/pasteleria`, `/demo/gym` cargan correctamente y sus enlaces al `/admin` permiten alternar el stock sin fallos.
