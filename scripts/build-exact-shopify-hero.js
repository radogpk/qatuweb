const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

const lines = content.split('\n');

let heroStartIdx = -1;
let heroEndIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('1. HERO EJECUTIVO') && heroStartIdx === -1) {
    heroStartIdx = i - 1; // including the comment line
  }
  if (lines[i].includes('2. BENTO GRID DE LAS 3 VERTICALES OFICIALES') && heroEndIdx === -1) {
    heroEndIdx = i - 1; // line before the bento grid comment
  }
}

if (heroStartIdx === -1 || heroEndIdx === -1) {
  console.error('Could not find hero boundaries:', { heroStartIdx, heroEndIdx });
  process.exit(1);
}

console.log(`Replacing lines from ${heroStartIdx} to ${heroEndIdx}`);

const beforeLines = lines.slice(0, heroStartIdx);
const afterLines = lines.slice(heroEndIdx);

const brandsList = [
  { name: 'Calzados Lucas', rubro: 'Comercio & Calzado', loc: 'Jr. Asamblea', icon: 'Store' },
  { name: 'Restaurante Las Flores', rubro: 'Gastronomía & Carta', loc: 'Jr. Bellido', icon: 'Utensils' },
  { name: 'Trankilandia Gym', rubro: 'Fitness & Entrenamiento', loc: 'Av. Mariscal Cáceres', icon: 'Dumbbell' },
  { name: 'Huamanga Coffee', rubro: 'Cafetería de Especialidad', loc: 'Plaza Mayor', icon: 'ShoppingBag' },
  { name: 'Boticas del Centro', rubro: 'Salud & Cuidado', loc: 'Jr. 28 de Julio', icon: 'ShieldCheck' },
  { name: 'Panadería El Sol', rubro: 'Panadería Artesanal', loc: 'Jr. Callao', icon: 'Utensils' },
  { name: 'Ayacucho Moda', rubro: 'Boutique & Ropa', loc: 'Jr. 9 de Diciembre', icon: 'Store' },
  { name: 'Natural Bio', rubro: 'Productos Orgánicos', loc: 'Jr. Cusco', icon: 'Sparkles' },
];

const newHeroSection = `      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO SHOPIFY (CANVAS DE MARCA + MARQUEE) */}
      {/* ============================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ── COLUMNA IZQUIERDA: Titular SEO/GEO + Formulario Estilo Shopify (Span 6) ── */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Píldora de Autoridad Local & GEO */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-medium shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Plataforma de Comercio en Huamanga, Ayacucho</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Entrega en 24h
              </span>
            </div>

            {/* Titular Principal — Claridad Comercial Absoluta */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-950 tracking-tight leading-[1.05]">
              Crea tu tienda online y vende a todo{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Ayacucho.
              </span>
            </h1>

            {/* Subtítulo con Enfoque en Conversión y Cero Comisiones */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              Qatu Web es la plataforma todo en uno para crear, gestionar y hacer crecer tu negocio local. Tus clientes piden por WhatsApp, pagan por Yape o Plin y tú controlas precios y pedidos desde tu celular sin comisiones.
            </p>

            {/* Tarjeta de Captura Rápida Estilo Shopify (Black Card) */}
            <div className="bg-slate-950 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl max-w-lg mx-auto lg:mx-0 space-y-3.5">
              <div className="space-y-1 text-left">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center justify-between">
                  <span>Comienza tu tienda online hoy</span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                    Sin comisiones
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  Configuración completa y catálogo listo para vender en 24 horas.
                </p>
              </div>

              <form onSubmit={handleQuickLead} className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <Store className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={businessInput}
                  onChange={(e) => setBusinessInput(e.target.value)}
                  placeholder="Escribe tu negocio (ej. Calzados Lucas)"
                  className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-lg bg-white text-slate-950 hover:bg-emerald-400 transition flex items-center justify-center shrink-0 shadow-sm font-bold active:scale-95"
                  title="Crear mi tienda en WhatsApp"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Micro-Garantías */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                0% Comisiones por venta
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Panel táctil en tu celular
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Soporte presencial en Huamanga
              </span>
            </div>

          </div>

          {/* ── COLUMNA DERECHA: Canvas de Diseño y Tienda Visual (Estilo Shopify) (Span 6) ── */}
          <div className="lg:col-span-6 flex justify-center">

            {/* Contenedor del Canvas de Estudio (Inspirado en la Ref. Oficial de Shopify) */}
            <div className="relative w-full max-w-lg aspect-[16/12] sm:aspect-[16/11] rounded-3xl bg-gradient-to-br from-slate-100 via-stone-50 to-slate-200/90 border border-slate-200/90 shadow-2xl p-4 sm:p-6 overflow-hidden flex items-center justify-center">

              {/* Grilla Sutil del Canvas de Edición */}
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

              {/* Fondo Editorial del Storefront (Inspirado en el Banner PITCH de Shopify) */}
              <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between relative">

                {/* Barra de Acento Superior Naranja/Coral (Igual a Shopify) */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500" />

                {/* Vista Previa de la Tienda de Marca */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                    <span>calzadoslucas.qatuweb.com</span>
                    <span className="text-emerald-700 font-sans font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      En línea
                    </span>
                  </div>

                  {/* Letras de Marca Grandes e Impactantes (Estilo Shopify Editorial) */}
                  <div className="py-2 text-center">
                    <span className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900/90 uppercase block select-none">
                      LUCAS
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mt-1">
                      Calzado Artesanal • Huamanga
                    </span>
                  </div>

                  {/* Fila de 3 Mini Productos de la Tienda */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80"
                        alt="Botín"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80"
                        alt="Zapatilla"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80"
                        alt="Especialidad"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* ── ELEMENTO FLOTANTE 1: Barra de Herramientas de Edición (Igual a Shopify) ── */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 px-3 py-1.5 flex items-center gap-2 text-slate-700 text-xs font-bold">
                <span className="text-emerald-600 font-black">✦</span>
                <span className="hover:text-slate-950 cursor-pointer">Aa</span>
                <span className="hover:text-slate-950 cursor-pointer font-black">B</span>
                <span className="hover:text-slate-950 cursor-pointer italic font-serif">I</span>
                <span className="text-slate-300">|</span>
                <span className="hover:text-slate-950 cursor-pointer">🔗</span>
                <span className="hover:text-slate-950 cursor-pointer">≡</span>
              </div>

              {/* ── ELEMENTO FLOTANTE 2: Selector de Paleta de Colores de Marca (Igual a Shopify) ── */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-2 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-rose-600 ring-2 ring-rose-400/40" />
                <span className="w-4 h-4 rounded-full bg-amber-600" />
                <span className="w-4 h-4 rounded-full bg-emerald-600" />
                <span className="w-4 h-4 rounded-full bg-slate-900" />
                <span className="w-4 h-4 rounded-full bg-amber-100 border border-slate-300" />
              </div>

              {/* ── ELEMENTO FLOTANTE 3: Tarjeta de Producto con Contador y Carrito (Igual al Tubo PITCH de Shopify) ── */}
              <div className="absolute top-10 sm:top-12 -right-2 sm:right-4 z-20 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 sm:p-3.5 w-40 sm:w-44 space-y-2">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&auto=format&fit=crop&q=80"
                    alt="Botín de Cuero"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-slate-950/80 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                    S/ 120
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                    Botín Cuero Caña Alta
                  </span>
                  {/* Selector de Cantidad & Carrito (Idéntico a Shopify) */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-700">
                      <span>-</span>
                      <span>1</span>
                      <span>+</span>
                    </div>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-lg bg-slate-900 text-white hover:bg-emerald-600 transition flex items-center justify-center shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── BARRA DESLIZANTE INFINITA: Marquee de Negocios en Ayacucho (Shopify Logo Marquee) ── */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-slate-200/80">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-slate-600 mb-6">
            Impulsamos el comercio independiente y marcas en Ayacucho
          </p>

          {/* Carril de Marquesina Continua */}
          <div className="relative w-full overflow-hidden py-2">
            {/* Máscaras de Gradiente en los extremos para desvanecimiento elegante */}
            <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

            <div className="animate-marquee flex items-center gap-6 sm:gap-10">
              {/* Primer bloque de marcas */}
              {brandsList.map((b, idx) => (
                <div
                  key={\`b1-\${idx}\`}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-slate-400 font-mono uppercase">#{idx + 1}</span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.loc}</span>
                </div>
              ))}

              {/* Segundo bloque idéntico para continuidad infinita */}
              {brandsList.map((b, idx) => (
                <div
                  key={\`b2-\${idx}\`}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-slate-400 font-mono uppercase">#{idx + 1}</span>
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

const finalLines = [...beforeLines, newHeroSection, ...afterLines];
fs.writeFileSync(filePath, finalLines.join('\n'), 'utf8');
console.log('Exact Shopify-style Hero + Logo Marquee injected successfully!');
