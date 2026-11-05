# Interiores y navegación de Qatu

Fecha: 25 de septiembre de 2026.

## Alcance

Se extendió la dirección visual aprobada a **Planes, Directorio, Anuncios, Contacto, Nosotros y Para tu negocio**, preservando el hero de la portada. Las páginas comparten fondos cálidos, tipografía jerárquica, acentos de marca y llamadas a la acción claras.

Nosotros y Cómo trabajamos adoptan una composición editorial con menos tarjetas: principios numerados, proceso de cuatro etapas, materiales necesarios y plazos según el plan. Se retiraron cifras sin respaldo, biografías no verificadas y promesas de atención que no podían sostenerse.

## Navegación y funcionalidad

- **Directorio y anuncios:** filtros guardados en la URL, búsqueda que reconoce palabras con o sin tilde y paginación de seis elementos por página. Cambiar un filtro devuelve a la primera página; los estados sin resultados permiten recuperar la lista.
- **Anuncios:** favoritos conservados en el navegador, ficha en diálogo y enlace que identifica el anuncio. Escape cierra la ficha y devuelve el foco al elemento de origen.
- **Planes y contacto:** la tabla comparativa y el selector del formulario usan la misma fuente de planes y precios, evitando importes contradictorios.
- **Contacto:** validación de campos y mensajes acordes con el resultado. Cuando no hay base de datos configurada, se prepara el mensaje para continuar por WhatsApp; no se presenta como una solicitud ya registrada.
- **Accesibilidad y móvil:** etiquetas de formulario, estados de selección, navegación por teclado, foco visible, acordeones accesibles y adaptación de las composiciones a pantallas pequeñas.

## Verificación realizada

- Compilación de producción completada.
- Nueve pruebas aisladas del comportamiento de paginación completadas.
- Pruebas del formulario y sus respuestas con dependencias simuladas.
- En navegador: ocho anuncios repartidos en páginas de seis y dos; filtros, búsqueda y estado vacío; cierre con Escape y restauración del foco; apertura y cierre de preguntas frecuentes.
- Comprobación de un único título principal y URL canónica en las páginas interiores.

El pase final verificó las seis páginas interiores a 320 px, los anuncios a 390 px y las composiciones de escritorio a 1440 px. Se corrigió el desbordamiento de la tabla: a 320 px, la página mide 314 px y las columnas se desplazan dentro de su propio contenedor. La compilación final de producción pasó.

Se probó el formulario en el entorno local sin base de datos: un teléfono inválido muestra el error y conserva los campos; al corregirlo, aparece «Tu mensaje está listo» y el foco pasa a esa confirmación. No se enviaron mensajes de WhatsApp ni se registraron solicitudes reales. Captura del resultado: `previews/qatu-interiores-desktop.png`.

## Antes de publicar

El entorno local no tiene la base de datos configurada. Debe conectarse y comprobarse el registro real de solicitudes antes de depender del formulario como canal de captación.

Las fotos, los negocios y los anuncios de ejemplo deben sustituirse o validarse con contenido real y autorizado. No deben presentarse como clientes o publicaciones confirmadas sin esa comprobación.

La estructura de contenido y los metadatos facilitan la comprensión por buscadores y sistemas de IA. No constituyen una promesa de posicionamiento, indexación ni aparición en sus respuestas.
