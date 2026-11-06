const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Update BRANDS_LIST to feature QuinuaQ and TrankilandiaGym
const newBrandsList = `const BRANDS_LIST = [
  { name: 'QuinuaQ', rubro: 'Superfoods & Granos Andinos', loc: 'Jr. Asamblea' },
  { name: 'TrankilandiaGym', rubro: 'Fitness & Suplementos', loc: 'Av. Mariscal Cáceres' },
  { name: 'Huamanga Coffee', rubro: 'Cafetería de Especialidad', loc: 'Plaza Mayor' },
  { name: 'Restaurante Las Flores', rubro: 'Gastronomía & Carta QR', loc: 'Jr. Bellido' },
  { name: 'Boticas del Centro', rubro: 'Salud & Cuidado', loc: 'Jr. 28 de Julio' },
  { name: 'Panadería El Sol', rubro: 'Panadería Artesanal', loc: 'Jr. Callao' },
  { name: 'Ayacucho Moda', rubro: 'Boutique & Ropa', loc: 'Jr. 9 de Diciembre' },
  { name: 'AgroAndina Gourmet', rubro: 'Exportación Orgánica', loc: 'Jr. Cusco' },
];`;

content = content.replace(/const BRANDS_LIST = \[[\s\S]*?\];/, newBrandsList);

// 2. Update handleQuickLead
content = content.replace(
  /const handleQuickLead =[\s\S]*?^  \};/m,
  `const handleQuickLead = (e: React.FormEvent) => {
    e.preventDefault();
    const query = businessInput.trim()
      ? \`Hola Qatu Web, quiero crear la tienda web para mi negocio: \${businessInput} en el Perú.\`
      : 'Hola Qatu Web, quiero solicitar información para digitalizar mi negocio con tienda virtual.';
    window.open(getWhatsAppUrl(query), '_blank', 'noopener,noreferrer');
  };`
);

// 3. Locate hero boundaries
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

const newHeroSection = `      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO SHOPIFY (TODO EN PANTALLA & SEO/GEO) */}
      {/* ============================================================== */}
      <section className="relative pt-2 sm:pt-4 pb-3 sm:pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Resplandor ambiental suave de alta gama */}
        <div className="absolute top-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ── COLUMNA IZQUIERDA: Titular SEO/GEO Imponente + Formulario Ejecutivo (Span 7) ── */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">

            {/* Titular Principal H1 — Tamaño Gigante, Rítmico, SEO & GEO de Alta Conversión */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-black text-slate-950 tracking-tight leading-[1.06]">
              Crea tu tienda virtual y vende a todo el{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Perú por WhatsApp.
              </span>
            </h1>

            {/* Subtítulo con Densidad Semántica de Negocio */}
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              La plataforma todo en uno para digitalizar tu negocio: catálogo web ultrarrápido, pedidos directos y organizados a tu WhatsApp y cobros por Yape o Plin con <strong>0% comisiones por venta</strong>. Creado para marcas y comercios en Ayacucho y todo el país.
            </p>

            {/* Tarjeta de Captura Interactiva Estilo Shopify (Simulador en Vivo) */}
            <div className="bg-slate-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl max-w-xl mx-auto lg:mx-0 space-y-2 border border-slate-800">
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
                    placeholder="Nombre de tu marca (ej. QuinuaQ, TrankilandiaGym)"
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1 pt-0.5 text-xs sm:text-sm text-slate-600 font-medium">
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

            {(() => {
              const inputLower = businessInput.trim().toLowerCase();
              const isGym = inputLower.includes('gym') || inputLower.includes('trankilandia') || inputLower.includes('fitness');
              const isShoes = inputLower.includes('calzado') || inputLower.includes('zapato');

              const activeData = isGym ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TRANKILANDIAGYM',
                slug: businessInput.trim()
                  ? businessInput.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'trankilandia'
                  : 'trankilandia',
                tagline: 'FITNESS & SUPLEMENTOS • TIENDA OFICIAL',
                p1: { name: 'Whey Protein Isolate', img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Creatina Monohidratada', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Shaker Pro Deportivo', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: businessInput.trim() ? \`\${businessInput.trim()}\` : 'Whey Protein Isolate 2kg',
                  price: 'S/ 149',
                  img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80'
                }
              } : isShoes ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'CALZADOS',
                slug: businessInput.trim()
                  ? businessInput.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'calzados'
                  : 'calzados',
                tagline: 'CALZADO & MODA URBANA • TIENDA OFICIAL',
                p1: { name: 'Botín Cuero Caña Alta', img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Zapatilla Urbana Classic', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Sneakers Streetwear', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: businessInput.trim() ? \`\${businessInput.trim()}\` : 'Botín Cuero Caña Alta',
                  price: 'S/ 120',
                  img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80'
                }
              } : {
                // Default: QuinuaQ (Superfoods & Alimentos Andinos Peruanos)
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'QUINUAQ',
                slug: businessInput.trim()
                  ? businessInput.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'quinuaq'
                  : 'quinuaq',
                tagline: 'SUPERFOODS & ALIMENTOS ANDINOS • PERÚ',
                p1: { name: 'Quinua Real Orgánica', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Café de Altura Gourmet', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Cacao Chuncho 70%', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: businessInput.trim() ? \`\${businessInput.trim()}\` : 'Quinua Real Orgánica 1kg',
                  price: 'S/ 24',
                  img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80'
                }
              };

              return (
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
                          {\`\${activeData.slug}.qatuweb.com\`}
                        </span>
                        <span className="text-emerald-700 font-sans font-bold flex items-center gap-1.5 shrink-0 text-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          En línea
                        </span>
                      </div>

                      {/* Letras de Marca Grandes e Impactantes — Totalmente Visibles sin obstrucción */}
                      <div className="py-2.5 text-center transition-all duration-200">
                        <span className={\`font-black tracking-tighter text-slate-900 uppercase block select-none px-2 leading-none \${
                          activeData.storeName.length > 12
                            ? 'text-xl sm:text-2xl lg:text-3xl'
                            : 'text-3xl sm:text-4xl lg:text-5xl'
                        }\`}>
                          {activeData.storeName}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 block mt-1">
                          {activeData.tagline}
                        </span>
                      </div>

                      {/* Fila de 3 Mini Productos de la Tienda Coherentes con el Rubro */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p1.img}
                            alt={activeData.p1.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p2.img}
                            alt={activeData.p2.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p3.img}
                            alt={activeData.p3.name}
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

                  {/* ── ELEMENTO FLOTANTE 3: Tarjeta de Producto con Carrito (Shopify Style - Coherente con Rubro) ── */}
                  <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 sm:p-3 w-38 sm:w-42 space-y-1.5">
                    <div className="relative h-20 sm:h-22 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img
                        src={activeData.card.img}
                        alt={activeData.card.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-slate-950/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        {activeData.card.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                        {activeData.card.title}
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
              );
            })()}

          </div>

        </div>

        {/* ── BARRA DESLIZANTE INFINITA: Marquee de Negocios en el Perú (Ajuste Compacto para encajar en Pantalla) ── */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80">
          <p className="text-center text-[11px] sm:text-xs uppercase font-bold tracking-widest text-slate-500 mb-2.5">
            Más de 40 comercios y marcas independientes venden con Qatu Web en el Perú
          </p>

          {/* Carril de Marquesina Continua */}
          <div className="relative w-full overflow-hidden py-0.5">
            {/* Máscaras de Gradiente en los extremos para desvanecimiento elegante */}
            <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

            <div className="animate-marquee flex items-center gap-4 sm:gap-6">
              {/* Primer bloque de marcas */}
              {BRANDS_LIST.map((b, idx) => (
                <div
                  key={\`b1-\${idx}\`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
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

const finalContent = beforeLines.join('\n') + '\n' + newHeroSection + afterLines.join('\n');
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Applied user feedback updates: removed top badge, compressed vertical space, set QuinuaQ/TrankilandiaGym defaults and adaptive rubro photos!');
