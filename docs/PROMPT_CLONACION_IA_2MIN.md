# ⚡ Prompt Maestro para Clonar un Cliente en 2 Minutos con IA

Copia y pega este prompt a tu agente de IA cuando cierres una venta en la calle:

---

```markdown
Actúa como Desarrollador Frontend de Qatu Web. 
Acabo de cerrar un nuevo cliente en Ayacucho con estos datos:

- Nombre del Negocio: [Ej: Zapatería Don Lucho]
- Subdominio deseado: [Ej: zapaterialucho]
- Rubro: [calzado | ropa | pasteleria | comida | regalos]
- WhatsApp para pedidos: [Ej: 51966999888]
- Dirección física: [Ej: Jr. Asamblea 310, Huamanga]
- Color principal de su bolsa/logo: [Ej: #9333EA o "Azul marino oscuro"]
- Productos iniciales (10 fotos enviadas por el dueño):
  1. [Nombre del producto 1] — S/ [Precio] — Tallas: [37, 38, 39]
  2. [Nombre del producto 2] — S/ [Precio] — Tallas: [38, 39, 40]
  3. ...

TAREA:
1. Genera el archivo `src/config/tenant.config.ts` adaptado a este cliente con su paleta de colores y variantes.
2. Carga los productos iniciales en el arreglo `initialProducts` listos para visualización inmediata.
3. Verifica que la comanda de WhatsApp use el número de WhatsApp oficial del dueño.
4. Ejecuta `npm run build` y genera el comando para desplegar a Vercel (`vercel --prod`).
```

---

### Flujo Operativo de 120 Segundos:
1. Ejecutas el CLI:  
   `node scripts/clone-tenant.js --name "Zapateria Don Lucho" --slug "zapaterialucho" --phone "51966999888" --color "#B23A2E"`
2. El agente ajusta las 10 fotos en WebP.
3. Despliegas a Vercel con `vercel --prod`.
4. Pegas la URL resultante en el Hub Super Admin (`/dashboard/admin`).
5. El subdominio `zapaterialucho.qatuweb.com` queda activo en menos de 2 minutos.
