# Qatu — Estrategia de marca y reforma de la portada

Fecha: 19 de septiembre de 2026. Alcance: página principal, navegación y pie compartidos. Documento de decisión y ejecución, previo a la nueva implementación.

## 1. Decisión de producto

**Qatu crea y acompaña la web de tu negocio, con catálogo y pedidos directos a WhatsApp.**

El público principal es el dueño de un pequeño comercio peruano que ya atiende por WhatsApp, tiene fotos y precios dispersos y necesita una presencia confiable sin aprender a administrar otra plataforma. La hipótesis es que valora más ver su oferta organizada y entender quién lo ayudará que descubrir funcionalidades técnicas. Se debe validar con comerciantes; no se presenta como investigación con usuarios ya realizada.

El directorio ayuda a descubrir negocios. Los anuncios sirven a la comunidad. Ambos conservan rutas propias, pero la portada se concentra en contratar la creación y el acompañamiento de una web. Tener tres ofertas visibles con la misma jerarquía dificulta identificar qué se está vendiendo y cuál es el siguiente paso.

## 2. Investigación de referentes

Se revisaron páginas oficiales y su estructura pública; SumUp, Kyte y Tiendanube también se inspeccionaron visualmente en navegador. Son referentes comerciales comparables, no pruebas de que una composición concreta aumente conversiones. No tenemos sus analíticas ni resultados de experimentos.

| Referente | Observación verificable | Aplicación a Qatu | Límite |
| --- | --- | --- | --- |
| [SumUp — Tienda en línea](https://www.sumup.com/es-es/tienda-en-linea/) | Titular de tarea, CTA central y escaparate con resumen de pedido. Separa capacidades, precios, ejemplos y FAQ; el pie agrupa soporte y empresa. | Hacer visibles productos y precio, mostrar el coste sin ambigüedad, responder objeciones antes del contacto final. | Su navegación responde a una cartera mucho mayor. No copiar sus promesas de gratuidad ni su modelo de comisiones. |
| [Kyte — Vender por WhatsApp](https://www.kyteapp.com/es/vender-por-whatsapp) | Parte del hábito de venta existente; conecta catálogo, pedidos y gestión con imágenes del producto. Incluye precios y preguntas frecuentes. Navbar con soluciones y ayuda; pie organizado por tareas. | Hablar de dejar de reenviar fotos y precios, mostrar el pedido ordenado y mantener el trato humano. | Qatu no debe atribuirse el inventario, informes ni automatizaciones de Kyte. |
| [Tiendanube — WhatsApp](https://www.tiendanube.com/canales/whatsapp) | Hero dividido entre mensaje, comerciante y conversación. Relaciona capacidades con el flujo de venta y después presenta planes y preguntas. | Producto y beneficio en el mismo primer pantallazo; CTA constante; secuencia descubrir → entender → elegir → contactar. | Su automatización y pagos integrados no existen en el repositorio de Qatu. Tampoco copiar sus métricas ni recursos decorativos. |
| [Shopify — Inicio](https://www.shopify.com/es) | En la arquitectura pública revisada, la plataforma distribuye capacidades, ejemplos y acceso a la contratación. | Separar la explicación del producto de las rutas de exploración y recursos. | Referencia estructural complementaria; no se realizó una auditoría visual completa de esta página. |

La [documentación de Kyte](https://docs.kyteapp.com/es/articles/9441046-recibe-tus-pedidos-por-whatsapp) también distingue el resumen de un pedido enviado por WhatsApp de otras notificaciones. Para Qatu debemos mostrar exactamente la transición, sin presentar una conversación simulada como un pedido recibido de verdad.

## 3. Veredicto sobre la versión actual

1. El hero retrasa el producto: el gran bloque centrado y el campo de subdominio ocupan la atención antes del catálogo. El visitante debe poder reconocer el resultado antes de introducir información.
2. El campo declara disponible cualquier nombre sin una consulta real. Esa falsa certeza perjudica la confianza. Se retira de la portada.
3. Los productos de ejemplo parecen reales, pero no permiten construir un pedido dentro de la demostración. Se implementará una interacción con cantidades, total y resumen, explícitamente rotulada como demostración.
4. El tablón rompe la continuidad entre conocer el servicio y elegir un plan. Se mantiene en `/anuncios`, accesible desde navegación secundaria y pie.
5. Testimonios con fotos de stock y resultados no verificados no constituyen evidencia. Se retiran de la portada. Los ejemplos se identifican como tales hasta contar con casos autorizados y verificables.
6. El plazo genérico de 3–5 días no corresponde a todos los planes. Se conservarán los plazos de la fuente de precios para cada plan.

## 4. Marca

**Categoría:** web y catálogo para negocios locales, creados con acompañamiento.

**Promesa:** tu negocio se presenta con su propia marca; tus clientes consultan y preparan su pedido; tú recibes la conversación en WhatsApp.

**Titular:** “Tu marca en una web. Tus pedidos en WhatsApp.”

**Mensaje de apoyo:** “Diseñamos la web de tu negocio con tus productos, precios y una forma sencilla de pedirte. Tú sigues atendiendo por WhatsApp y cobrando directamente.”

**Personalidad:** cercana, competente, directa. Ayacucho aparece como origen y contexto, no como disfraz visual ni como garantía de éxito.

**Diferencia:** creación acompañada + identidad propia + relación directa con el cliente. Evitar presentarlo como un editor autoservicio, un marketplace con caja central o un procesador de pagos.

**Vocabulario:** web, catálogo, productos, pedidos, tu negocio, te acompañamos. “Subdominio”, “SSL” y “hosting” se explican en contenido secundario, cuando ayudan a decidir.

## 5. Arquitectura y embudo

| Orden | Bloque | Pregunta que resuelve | Contenido / acción |
| --- | --- | --- | --- |
| 1 | Navegación | ¿Dónde estoy? | Marca, cómo funciona, ejemplos, planes; menú secundario de Qatu; CTA “Quiero mi web”. |
| 2 | Hero dividido | ¿Qué compro y para qué? | Beneficio concreto, CTA a WhatsApp y catálogo interactivo de ejemplo con precios visibles. |
| 3 | Condiciones esenciales | ¿Hay costes o esfuerzo ocultos? | Cero comisión de Qatu por venta, creación acompañada, precios visibles por plan. |
| 4 | Flujo de venta | ¿Qué cambia para mí? | Compartir el catálogo → elegir productos → enviar resumen → coordinar entrega y pago. |
| 5 | Ejemplos por rubro | ¿Puede parecerse a mi negocio? | Cafetería, florería y tienda; selección que actualiza el catálogo, sin atribuir resultados ni clientes. |
| 6 | Acompañamiento | ¿Quién hace el trabajo? | Qué entrega el comerciante, qué construye Qatu y cómo se revisa antes de publicar. |
| 7 | Planes | ¿Cuánto cuesta de verdad? | Creación única + mensualidad, alcance y tiempo por plan; detalles enlazados. |
| 8 | FAQ | ¿Y después de contratar? | Mantenimiento, cambios, WhatsApp, Yape/Plin, materiales y plazos. |
| 9 | Cierre | ¿Qué hago ahora? | Conversación directa, sin formulario redundante ni tiempos de respuesta inventados. |
| 10 | Pie | ¿Quién está detrás y dónde encuentro ayuda? | Origen, contacto, servicio, directorio y anuncios separados. |

CTA principal: “Quiero mi web”, siempre hacia el mismo contacto de Qatu. CTA secundario: “Probar el catálogo”, hacia la demostración. Los ejemplos no envían pedidos a comerciantes ni crean leads.

## 6. Dirección visual

- Conservar el rojo Qatu `#e11d48` como acento identificable y pizarra profunda como tinta. No sustituir la marca por un esquema verde.
- Fondo principal marfil `#faf9f6`; superficies blancas cálidas y degradados ambientales de muy baja intensidad detrás del producto.
- Titulares de 44–64 px en escritorio, 36–42 px en móvil; interlineado 1.08–1.12; tracking de -0.035em. Texto principal 15–17 px; secundarios legibles.
- Layout editorial de ancho limitado, separaciones amplias con propósito y pocas superficies elevadas. Sin colección interminable de tarjetas iguales.
- Catálogo frontal en HTML funcional, sin teléfonos en perspectiva ni capturas ajenas a Qatu. Fotografías ilustrativas etiquetadas; no llamar fotografías locales a material de stock.
- Botones con bordes de 8–10 px, área táctil mínima 44 px, feedback de presión y foco visible. Sin Sparkles, puntos parpadeantes, reseñas inventadas ni etiquetas flotantes decorativas.
- En móvil, texto y demostración en el primer recorrido; catálogo completo sin scroll horizontal accidental. Respetar movimiento reducido y navegación de teclado.

## 7. Comportamiento de la demostración

Los datos de ejemplo tienen nombres, fotografías y precios definidos en una sola fuente. El usuario cambia de rubro, añade y retira unidades y ve el total calculado. “Ver pedido” cambia al resumen de WhatsApp dentro del mismo espacio. Puede volver al catálogo, limpiar el pedido y continuar probando.

No se ejecuta ningún cobro ni se envía ningún mensaje. El resumen se identifica como vista previa. Yape/Plin se explican como datos o QR del comercio; la confirmación del pago y la entrega la realiza el negocio. Los planes que incluyen esa función lo indican expresamente.

## 8. Plan de ejecución

1. Registrar estrategia y alcance en este documento.
2. Construir fuente de ejemplos, catálogo interactivo y unidades pequeñas de UI; mantener contenido estático como Server Components.
3. Reemplazar la portada y simplificar navbar/pie. Conservar las rutas internas.
4. Centralizar las tarifas en la fuente existente. No modificar precios por criterio visual.
5. Verificar escritorio, móvil, selección de ejemplos, cantidades, vaciado, resumen, FAQ, navegación y ausencia de desbordamiento.
6. Ejecutar TypeScript y compilación de producción. Registrar resultados y límites.

## 9. Antes de una campaña pública

El rediseño puede publicarse tras revisión, pero no implica que estén resueltos los riesgos de captación previamente identificados. Confirmar el número comercial configurado, la persistencia real de leads y la información operativa. Sustituir ejemplos por casos reales únicamente con autorización y material verificado. Acordar política de mantenimiento y cambios antes de ampliar promesas.

**Medición propuesta, no implementada sin proveedor definido:** clic de CTA por ubicación, interacción con catálogo, visita a planes y conversación comercial cualificada. Los clics a WhatsApp no equivalen a conversaciones ni a ventas. Establecer una línea base y contrastar el mensaje con al menos cinco comerciantes; no anunciar porcentajes de mejora sin medición.

## 10. Criterios de aceptación

- El primer pantallazo deja claros web, catálogo y WhatsApp.
- La demostración permite modificar un pedido y no afirma haberlo enviado.
- Se conserva la identidad roja y se elimina el ruido de anuncios de la portada.
- Tarifas y plazos coinciden con la fuente del proyecto.
- No hay disponibilidad de dominios, reseñas, pagos ni resultados fingidos.
- Las rutas conservadas funcionan y la UI tiene foco, etiquetas, estados y adaptación móvil.
- Compilación y comprobación de tipos pasan; se documentan límites pendientes.
