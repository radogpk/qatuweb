const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let rawContent = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF
let content = rawContent.replace(/\r\n/g, '\n');

// 1. Comprehensive Mojibake and encoding fixes across the whole file
const mojibakeFixes = [
  ['BotÃ­n Cuero CaÃ±a Alta', 'Botín de Cuero Caña Alta'],
  ['BotÃ­n', 'Botín'],
  ['CaÃ±a', 'Caña'],
  ['GastronomÃ­a', 'Gastronomía'],
  ['PorciÃ³n', 'Porción'],
  ['CafÃ©', 'Café'],
  ['CÃ¡ceres', 'Cáceres'],
  ['MembresÃ­a', 'Membresía'],
  ['MaÃ±ana', 'Mañana'],
  ['ProteÃ­na', 'Proteína'],
  ['Â¿CÃ³mo', '¿Cómo'],
  ['suscripciÃ³n', 'suscripción'],
  ['dÃ­a', 'día'],
  ['continÃºa', 'continúa'],
  ['trÃ¡mites', 'trámites'],
  ['estÃ¡', 'está'],
  ['diseÃ±ado', 'diseñado'],
  ['cÃ¡mara', 'cámara'],
  ['SÃ­', 'Sí'],
  ['tÃ©cnico', 'técnico'],
  ['tÃ©cnicos', 'técnicos'],
  ['tÃ©rminos', 'términos'],
  ['Â¿En cuÃ¡nto', '¿En cuánto'],
  ['hÃ¡biles', 'hábiles'],
  ['envÃ­as', 'envías'],
  ['envÃ­o', 'envío'],
  ['nÃºmero', 'número'],
  ['Â¿QuiÃ©n', '¿Quién'],
  ['dueÃ±o', 'dueño'],
  ['informaciÃ³n', 'información'],
  ['TÃº', 'Tú'],
  ['Ãºnico', 'único'],
  ['Ãºnica', 'única'],
  ['Ãºnicos', 'únicos'],
  ['algÃºn', 'algún'],
  ['cÃ³digo', 'código'],
  ['verÃ¡', 'verá'],
  ['controlarÃ¡s', 'controlarás'],
  ['CatÃ¡logo', 'Catálogo'],
  ['mÃ³vil', 'móvil'],
  ['tÃ¡ctil', 'táctil'],
  ['rÃ¡pido', 'rápido'],
  ['automÃ¡tica', 'automática'],
  ['automÃ¡tico', 'automático'],
  ['automÃ¡ticas', 'automáticas'],
  ['MÃ³vil', 'Móvil'],
  ['MÃ³dulos', 'Módulos'],
  ['MÃ“DULOS', 'MÓDULOS'],
  ['instantÃ¡neo', 'instantáneo'],
  ['membresÃ­as', 'membresías'],
  ['Â¿Por quÃ©', '¿Por qué'],
  ['soluciÃ³n', 'solución'],
  ['SoluciÃ³n', 'Solución'],
  ['dÃ­as', 'días'],
  ['dÃ³lares', 'dólares'],
  ['inglÃ©s', 'inglés'],
  ['IngenierÃ­a', 'Ingeniería'],
  ['aÃ±o', 'año'],
  ['instalaciÃ³n', 'instalación'],
  ['SECCIÃ“N', 'SECCIÓN'],
  ['ActivaciÃ³n', 'Activación'],
  ['configuraciÃ³n', 'configuración'],
  ['OpciÃ³n', 'Opción'],
  ['promociÃ³n', 'promoción'],
  ['Alertas', 'Alertas'],
  ['ConversÃ©moslo', 'Conversémoslo'],
  ['Ãšnete', 'Únete'],
  ['â€¢', '•'],
  ['â', '']
];

for (const [bad, good] of mojibakeFixes) {
  content = content.replaceAll(bad, good);
}

// 2. Locate boundaries
const lines = content.split('\n');

let returnLineIdx = -1;
let bentoLineIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('return (') && i > 150 && returnLineIdx === -1) {
    returnLineIdx = i;
  }
  if (lines[i].includes('2. BENTO GRID DE LAS 3 VERTICALES OFICIALES')) {
    // Look backwards for the start of the comment block
    bentoLineIdx = i - 1;
  }
}

if (returnLineIdx === -1 || bentoLineIdx === -1) {
  console.error('Boundaries not found! returnLineIdx:', returnLineIdx, 'bentoLineIdx:', bentoLineIdx);
  process.exit(1);
}

console.log(`Replacing lines from ${returnLineIdx} to ${bentoLineIdx}`);

const beforeLines = lines.slice(0, returnLineIdx);
const afterLines = lines.slice(bentoLineIdx);

const newHeroBlock = `  return (
    <div className="bg-[#FFFFFF] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased overflow-x-hidden">

      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO TIENDANUBE / KYTE / OLACLICK       */}
      {/* ============================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica sutil de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Resplandor ambiental detrás del mockup */}
        <div className="absolute top-1/4 right-10 -z-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── COLUMNA IZQUIERDA: Propuesta de Valor y Conversión (Span 7) ── */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">

            {/* Píldora de Confianza Local */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-medium shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Huamanga, Ayacucho</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Tu Web Lista en 24 Horas
              </span>
            </div>

            {/* Titular Principal — Rítmico, Claro y sin cortes artificiales */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
              Vende más por WhatsApp con tu propia{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                tienda web.
              </span>
            </h1>

            {/* Subtítulo Comercial Humano y Directo */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Deja de mandar decenas de fotos sueltas por chat y anotar ventas en cuadernos. Tus clientes eligen sus productos desde su celular, el pedido llega armado y calculado a tu WhatsApp y tú cobras el 100% por Yape o Plin.
            </p>

            {/* Etiqueta de Precio y Cero Comisiones */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                Solo S/ 30 al mes
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-medium">0% comisiones por venta</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-medium">Subdominio propio incluido</span>
            </div>

            {/* Doble Botón de Llamado a la Acción (CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href={getWhatsAppUrl('Hola Qatu Web, quiero solicitar una demostración para mi negocio en Ayacucho.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Pedir Demostración Local</span>
              </a>
              <a
                href="#demos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 group"
              >
                <span>Ver Demos en Vivo</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3 Garantías Clave en Línea */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Cero comisiones por venta
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Panel táctil en tu celular
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Soporte presencial en Huamanga
              </span>
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Mockup de Celular + Notificación en Vivo (Span 5) ── */}
          <div className="lg:col-span-5 flex flex-col items-center">

            {/* Selector de Rubros Compacto e Interactivo */}
            <div className="w-full max-w-[340px] mb-4 flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('zapateria')}
                className={\`flex-1 py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 \${
                  activeTab === 'zapateria'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }\`}
              >
                <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Calzado</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('restaurante')}
                className={\`flex-1 py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 \${
                  activeTab === 'restaurante'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }\`}
              >
                <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Restaurante</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gimnasio')}
                className={\`flex-1 py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 \${
                  activeTab === 'gimnasio'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-950'
                }\`}
              >
                <Dumbbell className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Gimnasio</span>
              </button>
            </div>

            {/* Contenedor Relativo para Celular y Widgets Flotantes */}
            <div className="relative w-full max-w-[340px]">

              {/* WIDGET FLOTANTE SUPERIOR: Control del Dueño */}
              <div className="absolute -top-3.5 -right-3 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-slate-200/90 text-xs space-y-1.5 max-w-[210px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tu Panel</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-800">Control Stock:</span>
                  <button
                    type="button"
                    onClick={handleToggleStock}
                    className={\`px-2 py-0.5 rounded-full text-[10px] font-bold border transition active:scale-95 \${
                      inStockStatus
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }\`}
                  >
                    {inStockStatus ? 'Disponible' : 'Agotado'}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  ⚡ 42 pedidos este mes
                </div>
              </div>

              {/* CHASIS DEL CELULAR (Smartphone iPhone Frame) */}
              <div className="bg-slate-950 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 shadow-slate-950/20">

                {/* Isla Dinámica Superior */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800 ml-auto mr-2" />
                </div>

                {/* Pantalla del Teléfono */}
                <div className="bg-white rounded-[34px] overflow-hidden border border-slate-100 flex flex-col">

                  {/* Barra de Navegación del Catálogo */}
                  <div className="bg-slate-900 text-white px-3.5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                        {activeTab === 'zapateria' ? (
                          <Store className="w-4 h-4 text-emerald-400" />
                        ) : activeTab === 'restaurante' ? (
                          <Utensils className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Dumbbell className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate leading-tight">
                          {showcase.businessName}
                        </h4>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{showcase.location}</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0">
                      Abierto
                    </span>
                  </div>

                  {/* Tarjeta de Producto Destacado */}
                  <div className="p-3 bg-slate-50 border-b border-slate-100 space-y-2.5">
                    {/* Imagen con Etiqueta */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 shadow-inner">
                      <img
                        src={showcase.products[0].imageUrl}
                        alt={showcase.products[0].name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                        🔥 Más Vendido
                      </span>
                    </div>

                    {/* Título y Precio */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {showcase.products[0].name}
                        </h5>
                        <p className="text-[10px] text-slate-500 font-medium">Disponible para entrega inmediata</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-slate-950 block">
                          S/ {showcase.products[0].price.toFixed(2)}
                        </span>
                        {showcase.products[0].originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            S/ {showcase.products[0].originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Selector de Variantes (Tallas / Porciones) */}
                    <div className="pt-1 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {showcase.products[0].variantLabel}:
                      </span>
                      <div className="flex gap-1">
                        {showcase.products[0].variants.map((v) => {
                          const variantKey = \`\${activeTab}-\${showcase.products[0].id}\`;
                          const currentVar = selectedVariants[variantKey] || showcase.products[0].variants[0];
                          return (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setSelectedVariants((prev) => ({ ...prev, [variantKey]: v }))}
                              className={\`px-2 py-0.5 text-[10px] rounded-md font-bold transition \${
                                currentVar === v
                                  ? 'bg-slate-900 text-white shadow-2xs'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }\`}
                            >
                              {v}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Botón de Agregar al Pedido WhatsApp */}
                    <button
                      type="button"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-500 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Agregar al Pedido</span>
                    </button>
                  </div>

                  {/* Segundo Producto (Vista Previa Pequeña) */}
                  <div className="p-3 flex items-center gap-2.5 bg-white">
                    <img
                      src={showcase.products[1].imageUrl}
                      alt={showcase.products[1].name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h6 className="font-bold text-[11px] text-slate-900 truncate">
                        {showcase.products[1].name}
                      </h6>
                      <span className="text-[10px] font-black text-slate-700">
                        S/ {showcase.products[1].price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      Ver detalle
                    </span>
                  </div>

                </div>
              </div>

              {/* NOTIFICACIÓN FLOTANTE INFERIOR: Comanda de WhatsApp que Llega al Teléfono */}
              <div className="absolute -bottom-6 -left-3 -right-3 z-30 bg-slate-900 text-white rounded-2xl p-3 shadow-2xl border border-emerald-500/30 flex items-start justify-between gap-3 backdrop-blur-md">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp del Dueño (Listo para atender):</span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-mono leading-snug truncate">
                    ✅ Pedido {showcase.whatsappOrder.number} • {showcase.whatsappOrder.text}
                  </p>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {showcase.whatsappOrder.paymentNote}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                  0% comisión
                </span>
              </div>

            </div>

            {/* Accesos Directos a las Demos Reales */}
            <div className="w-full max-w-[340px] mt-10 grid grid-cols-2 gap-2.5">
              <Link
                href={showcase.demoUrl}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition active:scale-95 shadow-xs"
              >
                <span>Tienda Móvil</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
              <Link
                href={showcase.demoAdminUrl}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-200 transition active:scale-95"
              >
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span>Panel Dueño (/admin)</span>
              </Link>
            </div>

          </div>

        </div>
      </section>
`;

const finalFileLines = [...beforeLines, newHeroBlock, ...afterLines];
const finalContent = finalFileLines.join('\n');

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Hero successfully replaced and encoding cleaned! Total lines:', finalFileLines.length);
