# Plan de Implementación: Panel de Gestión de Clientes, Suscripciones y Kill-Switch para Qatu

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el Hub de Clientes y Suscripciones dentro de Qatu (`qatuweb.com`), proveyendo un panel Super Admin para gestionar subdominios, clientes, bóveda de credenciales y el Kill-switch de servicios; un portal de clientes autenticado con Google OAuth para ver sus negocios y estados de suscripción; y el endpoint Edge de verificación para el Cloudflare Worker.

**Architecture:** Módulo integrado en Next.js 15 (App Router) con TypeScript y Tailwind CSS, bajo rutas `/admin` (Super Admin), `/portal` (Clientes) y `/api/domain-status` (Edge API). Utiliza Supabase para autenticación y base de datos con RLS estricto y fallback resiliente para desarrollo local.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, `@supabase/supabase-js`, Web Crypto API (AES-256).

---

### Task 1: Definición de Tipos, Modelo de Datos y Capa de Servicios

**Files:**
- Create: `src/types/panel.ts`
- Create: `src/lib/services/panel.mock.ts`
- Create: `src/lib/services/panel.service.ts`
- Create: `src/lib/security/encryption.ts`

**Interfaces:**
- Produces: `UserProfile`, `Business`, `BusinessCredentials`, `ServiceRequest`, `DomainStatusResponse`
- Produces: `panelService` con métodos `getBusinesses()`, `updateBusinessStatus()`, `getCredentials()`, `saveBusiness()`, `getClientBusinesses(userId)`, `createServiceRequest()`

- [ ] **Step 1: Crear `src/types/panel.ts` con todos los contratos de datos**
Definir tipos estrictos para roles (`'admin' | 'client'`), estado de negocio (`'active' | 'suspended' | 'grace'`), planes (`'monthly' | 'yearly'`), credenciales técnicas y respuestas del Kill-switch.

- [ ] **Step 2: Crear `src/lib/security/encryption.ts`**
Implementar cifrado simétrico AES-GCM usando Web Crypto API nativo para almacenar y descifrar contraseñas sensibles con clave secreta de entorno (`ENCRYPTION_SECRET`).

- [ ] **Step 3: Crear datos semilla y fallback en `src/lib/services/panel.mock.ts`**
Incluir datos de prueba realistas representativos de Ayacucho (ej. "Calzados Lucas", "Hotel Plaza Ayacucho", "Panadería Huamanga") para permitir probar el panel sin requerir conexión remota activa inmediata a Supabase.

- [ ] **Step 4: Implementar `src/lib/services/panel.service.ts`**
Crear servicio desacoplado que consulte Supabase si las credenciales de entorno existen, o haga fallback a los datos mock en desarrollo local.

- [ ] **Step 5: Commit**
```bash
git add src/types/panel.ts src/lib/security/encryption.ts src/lib/services/
git commit -m "feat(panel): create core types, encryption helpers, and panel data service"
```

---

### Task 2: Endpoint del Kill-Switch para Cloudflare Worker

**Files:**
- Create: `src/app/api/domain-status/route.ts`

**Interfaces:**
- Produces: `GET /api/domain-status?slug=[slug]` -> `{ found: boolean, status: string, target_url: string, name: string }`

- [ ] **Step 1: Implementar la ruta API `src/app/api/domain-status/route.ts`**
Recibir parámetro `slug`, consultar el estado del negocio vía `panelService`, devolver JSON con cabeceras CORS permisivas y cache `Cache-Control: public, s-maxage=60, stale-while-revalidate=30` para optimizar latencia en Cloudflare.

- [ ] **Step 2: Verificar la respuesta con curl o fetch local**
Probar `http://localhost:3000/api/domain-status?slug=calzados-lucas` y confirmar respuesta HTTP 200 con `{ found: true, status: 'active', ... }`.

- [ ] **Step 3: Commit**
```bash
git add src/app/api/domain-status/route.ts
git commit -m "feat(api): implement edge domain-status endpoint for cloudflare worker kill-switch"
```

---

### Task 3: Pantalla de Acceso y Autenticación (`/login`)

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/components/auth/LoginForm.tsx`

**Interfaces:**
- Produces: Página `/login` con diseño sobrio y confiable, botón oficial "Continuar con Google" y selector de rol para entorno de pruebas.

- [ ] **Step 1: Crear `src/components/auth/LoginForm.tsx`**
Diseñar la tarjeta de login con identidad de Qatu, botón Google OAuth conectado a `supabase.auth.signInWithOAuth()`, y atajo de demostración de rol (Admin vs Cliente) para testing inmediato.

- [ ] **Step 2: Crear la página `src/app/login/page.tsx`**
Integrar el formulario centrado, badges de seguridad SSL/Google, y redirección inteligente (`/admin` si es administrador, `/portal` si es cliente).

- [ ] **Step 3: Commit**
```bash
git add src/app/login/ src/components/auth/
git commit -m "feat(auth): create unified login page with google oauth and role routing"
```

---

### Task 4: Panel Super Admin (`/admin`)

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/AdminHeader.tsx`
- Create: `src/components/admin/AdminStatsCards.tsx`
- Create: `src/components/admin/BusinessTable.tsx`
- Create: `src/components/admin/KillSwitchToggle.tsx`
- Create: `src/components/admin/CredentialVaultModal.tsx`
- Create: `src/components/admin/NewBusinessModal.tsx`

**Interfaces:**
- Produces: Panel Super Admin completo con métricas de cobro, lista de clientes, interruptores de Kill-Switch en tiempo real, bóveda de credenciales protegida y alta de nuevos negocios.

- [ ] **Step 1: Crear layout y cabecera de administración**
Diseñar barra de navegación superior con distintivo "Super Admin", selector de rol, y atajo de regreso a la web pública.

- [ ] **Step 2: Crear tarjetas de estadísticas (`AdminStatsCards.tsx`)**
Visualizar: Total de negocios gestionados, activos, suspendidos, y recaudación mensual proyectada (en S/.).

- [ ] **Step 3: Crear `BusinessTable.tsx` y `KillSwitchToggle.tsx`**
Tabla interactiva con búsqueda por subdominio o negocio, filtro por estado (`Activo`, `Suspendido`), interruptor visual del Kill-switch con cambio de estado inmediato, y botón WhatsApp para avisos de cobro.

- [ ] **Step 4: Crear modal de Bóveda de Credenciales (`CredentialVaultModal.tsx`)**
Ventana emergente que muestra de forma ordenada y copiable: Cuenta Gmail, contraseña revelable, teléfono de recuperación, URLs de GitHub, Vercel y Supabase.

- [ ] **Step 5: Crear modal de alta de negocio (`NewBusinessModal.tsx`)**
Formulario para registrar un nuevo negocio, asignar subdominio slug, asociar correo de Google del cliente y configurar plan (S/. 30 mensual o S/. 300 anual).

- [ ] **Step 6: Integrar todo en `src/app/admin/page.tsx`**
Conectar componentes con `panelService` con reactividad de estado.

- [ ] **Step 7: Commit**
```bash
git add src/app/admin/ src/components/admin/
git commit -m "feat(admin): build complete super admin hub with kill-switch and credential vault"
```

---

### Task 5: Portal de Clientes (`/portal`)

**Files:**
- Create: `src/app/portal/layout.tsx`
- Create: `src/app/portal/page.tsx`
- Create: `src/components/portal/ClientHeader.tsx`
- Create: `src/components/portal/ClientBusinessCard.tsx`
- Create: `src/components/portal/RequestServiceModal.tsx`

**Interfaces:**
- Produces: Dashboard para el comerciante donde visualiza todos sus negocios activos, enlaces directos a su web y a su panel de gestión propio, estado de pago y solicitud de nuevas webs.

- [ ] **Step 1: Crear layout del portal del cliente**
Barra superior limpia con nombre del cliente, botón directo a WhatsApp de soporte y botón de cerrar sesión.

- [ ] **Step 2: Crear `ClientBusinessCard.tsx`**
Tarjeta destacada para cada negocio del cliente:
- Badge de estado (`Activo` en verde, `Suspendido` en ámbar/rojo).
- Próxima fecha de vencimiento y plan contratado (S/. 30/mes).
- Botón primario: *"Ver mi Tienda Web"* (`slug.qatuweb.com`).
- Botón secundario: *"Ir a mi Panel de Ventas/Caja"* (`custom_admin_url`).

- [ ] **Step 3: Crear `RequestServiceModal.tsx`**
Modal intuitivo donde el comerciante puede solicitar la creación de otra página web o sucursal para su marca.

- [ ] **Step 4: Integrar todo en `src/app/portal/page.tsx`**
Renderizado dinámico de la lista de negocios del cliente autenticado.

- [ ] **Step 5: Commit**
```bash
git add src/app/portal/ src/components/portal/
git commit -m "feat(portal): implement client dashboard with business cards and service request modal"
```

---

### Task 6: Integración Global, Navegación y Verificación

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Agregar acceso al Portal en el Navbar principal**
Agregar botón discreto y elegante *"Ingresar / Mi Panel"* en el `Navbar.tsx` de la web comercial de Qatu que dirija a `/login`.

- [ ] **Step 2: Verificar compilación completa con `npm run build`**
Comprobar que todas las rutas estáticas y dinámicas compilen sin ningún error de TypeScript o lint.

- [ ] **Step 3: Verificar navegación en vivo en navegador**
Navegar por:
1. `http://localhost:3000/login`
2. `http://localhost:3000/admin` (probar cambio de Kill-switch y ver credenciales)
3. `http://localhost:3000/portal` (probar vista del cliente)
4. `http://localhost:3000/api/domain-status?slug=calzados-lucas`

- [ ] **Step 4: Commit final**
```bash
git add .
git commit -m "feat(navigation): link login and portal in navbar and verify full build"
```
