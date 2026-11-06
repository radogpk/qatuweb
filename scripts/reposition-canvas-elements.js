const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Locate hero boundaries
const lines = content.split('\n');
let heroStartIdx = -1;
let heroEndIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('1. HERO EJECUTIVO') && heroStartIdx === -1) {
    heroStartIdx = i - 1;
  }
  if (lines[i].includes('2. BENTO GRID DE LAS 3 VERTICALES OFICIALES') && heroEndIdx === -1) {
    heroEndIdx = i - 1;
  }
}

if (heroStartIdx === -1 || heroEndIdx === -1) {
  console.error('Could not find hero boundaries:', { heroStartIdx, heroEndIdx });
  process.exit(1);
}

const beforeLines = lines.slice(0, heroStartIdx);
const afterLines = lines.slice(heroEndIdx);

const refinedHeroSection = `      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO SHOPIFY (MÁXIMO IMPACTO SEO & GEO) */}
      {/* ============================================================== */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Resplandor ambiental suave de alta gama */}
        <div className="absolute top-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── COLUMNA IZQUIERDA: Titular SEO/GEO Imponente + Formulario Ejecutivo (Span 7) ── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">

            {/* Píldora de Autoridad SEO & GEO Nacional */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Plataforma de Comercio Digital para el Perú</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Activación en 24h
              </span>
            </div>

            {/* Titular Principal H1 — Tamaño Gigante, Rítmico, SEO & GEO de Alta Conversión */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-black text-slate-950 tracking-tight leading-[1.06]">
              Crea tu tienda virtual y vende a todo el{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Perú por WhatsApp.
              </span>
            </h1>

            {/* Subtítulo con Densidad Semántica de Negocio */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              La plataforma todo en uno para digitalizar tu negocio: catálogo web ultrarrápido, pedidos directos y organizados a tu WhatsApp y cobros por Yape o Plin con <strong>0% comisiones por venta</strong>. Creado para marcas y comercios en Ayacucho y todo el país.
            </p>

            {/* Tarjeta de Captura Interactiva Estilo Shopify (Simulador en Vivo) */}
            <div className="bg-slate-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl max-w-xl mx-auto lg:mx-0 space-y-2.5 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Simula tu tienda en vivo
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                  0% comisiones
                </span>
              </div>

              <p className="text-xs text-slate-400 font-normal">
                Escribe el nombre de tu marca para ver cómo lucirá tu tienda oficial en tiempo real:
              </p>

              <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 transition shadow-inner">
                <div className="flex items-center flex-1 min-w-0 px-2">
                  <Store className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={businessInput}
                    onChange={(e) => setBusinessInput(e.target.value)}
                    placeholder="Nombre de tu marca (ej. Calzados Lucas, Qori)"
                    className="w-full bg-transparent py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="h-9 sm:h-10 px-4 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center justify-center gap-2 shrink-0 font-bold text-xs sm:text-sm active:scale-95 shadow-md"
                  title="Crear mi tienda en WhatsApp"
                >
                  <span>Crear Mi Tienda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Micro-Garantías de Confianza */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 pt-0.5 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                0% Comisiones por venta
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Panel táctil en tu celular
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Envíos y cobros en todo el Perú
              </span>
            </div>

          </div>

          {/* ── COLUMNA DERECHA: Canvas de Estudio Reactivo (Span 5) ── */}
          <div className="lg:col-span-5 flex justify-center">

            {/* Contenedor del Canvas de Estudio (Inspirado en la Ref. Oficial de Shopify) */}
            <div className="relative w-full max-w-[480px] lg:max-w-[500px] aspect-[16/12] rounded-3xl bg-gradient-to-br from-slate-100 via-stone-50 to-slate-200/90 border border-slate-200/90 shadow-2xl p-4 sm:p-5 flex items-center justify-center">

              {/* Grilla Sutil del Canvas de Edición */}
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none rounded-3xl" />

              {/* Fondo Editorial del Storefront con datos reactivos */}
              <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between relative transition-all duration-300">

                {/* Barra de Acento Superior Naranja/Coral (Shopify Style) */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500" />

                {/* Vista Previa de la Tienda de Marca */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  {/* Barra de dominio superior */}
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono border-b border-slate-100 pb-2">
                    <span className="text-slate-600 font-semibold truncate max-w-[220px]">
                      {businessInput.trim()
                        ? \`\${businessInput.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mitienda'}.qatuweb.com\`
                        : 'calzadoslucas.qatuweb.com'}
                    </span>
                    <span className="text-emerald-700 font-sans font-bold flex items-center gap-1.5 shrink-0 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      En línea
                    </span>
                  </div>

                  {/* Letras de Marca Grandes e Impactantes — Totalmente Visibles sin obstrucción */}
                  <div className="py-2.5 text-center transition-all duration-200">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase block select-none truncate px-2">
                      {businessInput.trim() ? businessInput.trim().toUpperCase() : 'LUCAS'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 block mt-1">
                      {businessInput.trim() ? 'Tienda Online Oficial • Perú' : 'Calzado Artesanal • Tienda Oficial'}
                    </span>
                  </div>

                  {/* Fila de 3 Mini Productos de la Tienda */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80"
                        alt="Botín de Cuero"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80"
                        alt="Zapatilla Urbana"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=80"
                        alt="Zapatilla Street Style"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* ── ELEMENTO FLOTANTE 1: Barra de Herramientas de Edición (Shopify Style) ── */}
              <div className="absolute top-2 sm:top-3 left-3 sm:left-5 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/90 px-3 py-1 flex items-center gap-2 text-slate-700 text-xs font-bold">
                <span className="text-emerald-600 font-black">✦</span>
                <span>Aa</span>
                <span className="font-black">B</span>
                <span className="italic font-serif">I</span>
                <span className="text-slate-300">|</span>
                <span>🔗</span>
                <span>≡</span>
              </div>

              {/* ── ELEMENTO FLOTANTE 2: Selector de Paleta de Colores de Marca ── */}
              <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-5 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/90 p-1.5 sm:p-2 flex items-center gap-1.5">
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-600 ring-2 ring-rose-400/40 cursor-pointer" />
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-600 cursor-pointer" />
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-600 cursor-pointer" />
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-900 cursor-pointer" />
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-100 border border-slate-300 cursor-pointer" />
              </div>

              {/* ── ELEMENTO FLOTANTE 3: Tarjeta de Producto con Carrito (Shopify Style - Posición Flotante Inferior Derecha Limpia) ── */}
              <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 sm:p-3 w-36 sm:w-40 space-y-1.5">
                <div className="relative h-20 sm:h-22 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80"
                    alt="Producto Destacado"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-slate-950/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                    S/ 120
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                    {businessInput.trim() ? \`\${businessInput} Exclusivo\` : 'Botín Cuero Caña Alta'}
                  </span>
                  {/* Selector de Cantidad & Carrito */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-lg px-2 py-0.5 text-[9px] font-bold text-slate-700">
                      <span>-</span>
                      <span>1</span>
                      <span>+</span>
                    </div>
                    <button
                      type="button"
                      className="w-6 h-6 rounded-lg bg-slate-900 text-white hover:bg-emerald-600 transition flex items-center justify-center shrink-0 shadow-xs"
                      title="Agregar al Carrito"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── BARRA DESLIZANTE INFINITA: Marquee de Negocios en el Perú ── */}
        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-slate-200/80">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-slate-500 mb-3.5">
            Más de 40 comercios y marcas independientes venden con Qatu Web en el Perú
          </p>

          {/* Carril de Marquesina Continua */}
          <div className="relative w-full overflow-hidden py-1">
            {/* Máscaras de Gradiente en los extremos para desvanecimiento elegante */}
            <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

            <div className="animate-marquee flex items-center gap-4 sm:gap-6">
              {/* Primer bloque de marcas */}
              {BRANDS_LIST.map((b, idx) => (
                <div
                  key={\`b1-\${idx}\`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">#{idx + 1}</span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.loc}</span>
                </div>
              ))}

              {/* Segundo bloque idéntico para continuidad infinita */}
              {BRANDS_LIST.map((b, idx) => (
                <div
                  key={\`b2-\${idx}\`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">#{idx + 1}</span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

`;

const finalContent = beforeLines.join('\n') + '\n' + refinedHeroSection + afterLines.join('\n');
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully polished hero layout with unobscured brand name!');
