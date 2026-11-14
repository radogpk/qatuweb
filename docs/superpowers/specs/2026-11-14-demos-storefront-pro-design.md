# Especificación de Diseño: Storefront Pro 2.0 — Profesionalización Integral de Demos

- **Fecha:** 2026-11-14
- **Estado:** Aprobado
- **Autor:** Antigravity & Luis Gerardo Llocclla Sauñe (Qatu Web)

---

## 1. Diagnóstico y Visión de Producto

Las demostraciones en vivo (`/demo/calzados`, `/demo/pasteleria`, `/demo/gym`) son la principal herramienta de venta de Qatu Web en Huamanga. En su versión inicial, utilizaban una cuadrícula genérica y un encabezado plano que no transmitía el valor de una tienda virtual moderna ni diferenciaba las necesidades operativas de cada rubro.

**Storefront Pro 2.0** transforma cada vertical en una experiencia de compra móvil de nivel comercial, inspirada en referentes líderes del mercado (tiendas de calzado streetwear tipo *Platanitos/StockX*, cartas gastronómicas interactivas tipo *Toast/ChowNow* y cadenas fitness tipo *SmartFit*).

---

## 2. Arquitectura Visual y Componentes por Vertical

### 2.1. Calzado & Boutiques (`/demo/calzados` - Calzados Lucas Huamanga)
- **Estética:** *Modern Streetwear & Cuero Legítimo*. Blanco puro, tipografía sans moderna, acentos rojo ayacuchano y negro carbón.
- **Header:**
  - Banner fotográfico con avatar/logo de marca y badge *"🟢 Abierto hoy en Jr. Asamblea 245 • Envíos a todo Huamanga"*.
  - Indicador de confianza: *"Garantía de cuero legítimo • Cambios de talla sin costo"*.
- **Navegación:** Barra horizontal de categorías con píldoras (*Todos*, *Zapatillas Urbanas*, *Botines de Cuero*, *Mocasines*, *Liquidación*).
- **Tarjetas de Producto:**
  - Fotografía con ratio 1:1 y badge de oferta (*"-15% OFF"*) o stock (*"Últimos 2 pares"*).
  - Selector táctil de tallas en pastillas redondas (`37`, `38`, `39`, `40`, `41`).
  - Botón táctil *"Pedir por WhatsApp"* con animación de confirmación.

### 2.2. Gastronomía & Pastelería (`/demo/pasteleria` - Pastelería Las Flores)
- **Estética:** *Gourmet Cálido & Editorial*. Tonos café cálido, ámbar miel, fondo crema suave y tipografía serif apetitosa.
- **Header:**
  - Foto de ambiente del salón y templo San Francisco, avatar de pastelería fina.
  - Badge dinámico: *"🟢 Horno Activo • Pedidos para delivery o retiro en tienda"*.
  - Horario de atención y tiempo estimado: *"Tiempo de preparación: 15-25 min"*.
- **Navegación:** Píldoras de categorías gastronómicas (*Todos*, *Tortas Enteras*, *Porciones & Bocaditos*, *Desayunos Huamanguinos*, *Cafés de Altura*).
- **Tarjetas de Producto:**
  - Selector de porciones (*Personal*, *Mediana 10 porc.*, *Familiar 20 porc.*).
  - Selector de acompañamiento o adicionales (*Con café pasado*, *Con velas de cumpleaños*).
  - Estado *"Agotado por hoy"* con tarjeta atenuada cuando el comerciante lo apaga desde el Panel de Bolsillo.

### 2.3. Gimnasios & Centros Fitness (`/demo/gym` - Trankilandia Gym & Fitness)
- **Estética:** *High-Performance Dark Mode*. Fondo oscuro pizarra (`#0f172a`), tipografía atlética bold y acentos verde esmeralda / neón.
- **Header:**
  - Fotografía de sala de pesas y máquinas, badge *"⚡ Counter Abierto • Av. Mariscal Cáceres 540"*.
  - Horario: *"Lunes a Sábado: 06:00 - 22:00"*.
- **Navegación:** Categorías (*Membresías & Pases*, *Suplementos Deportivos*, *Ropa & Accesorios*).
- **Tarjetas de Membresía (Diseño Pricing Card):**
  - Lista de beneficios con checks esmeralda (*Acceso ilimitado*, *Evaluación física mensual*, *Casillero incluido*, *Acceso con DNI*).
  - Badge de *"Más popular / Ahorras 20%"*.
- **Tarjetas de Suplementos:**
  - Selector de sabor (*Chocolate Suizo*, *Vainilla Francesa*) y tabla de gramos de proteína.

---

## 3. Experiencia Móvil de Compra y Checkout

1. **Buscador en tiempo real:** Barra de búsqueda rápida para filtrar productos instantáneamente por nombre.
2. **Barra Flotante de Carrito:**
   - Barra fija inferior con contador visual de items, monto total en soles y botón *"Revisar Pedido"*.
3. **Checkout Drawer / Modal:**
   - Selector visual de entrega: `🏪 Retiro en Tienda` vs `🛵 Delivery a Domicilio`.
   - Selector visual de método de pago con insignias de `Yape`, `Plin` y `Efectivo contraentrega`.
   - Campo para dedicatoria o instrucciones especiales (ej. "Tocar timbre 2do piso" o "Escribir 'Feliz Cumpleaños Mamá'").
   - Botón *"Enviar Pedido a WhatsApp"* que genera la comanda estructurada y abre WhatsApp directamente.

---

## 4. Barra Superior Flotante del Vendedor (Herramienta Comercial)

En la parte superior de todas las demos, una barra de herramientas sutil permite al comerciante o vendedor:
- **Selector de Vertical en 1 toque:** Botones rápidos `[👟 Calzados]` `[🍰 Pastelería]` `[🏋️ Gimnasio]` para cambiar de rubro al instante.
- **"⚡ Probar con mi WhatsApp":** Modal donde el cliente escribe su número de teléfono y todos los pedidos de la demo le llegan a su propio celular.
- **"📱 Panel de Bolsillo":** Enlace directo al `/admin` de la vertical para simular el apagado de stock en tiempo real.
