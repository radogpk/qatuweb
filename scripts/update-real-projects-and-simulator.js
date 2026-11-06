const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Update BRANDS_LIST to explicitly feature the 3 real projects
const newBrandsDef = `const BRANDS_LIST = [
  { name: 'QuinuaQ', rubro: 'Restaurante de Campo & Carta QR', loc: 'Quinua, Ayacucho' },
  { name: 'Mama Alice ONG', rubro: 'ONG & Formación Social', loc: 'Huamanga, Ayacucho' },
  { name: 'TrankilandiaGym', rubro: 'Fitness & Control DNI', loc: 'Av. Mariscal Cáceres' },
];`;

content = content.replace(/const BRANDS_LIST = \[[\s\S]*?\];/, newBrandsDef);

// 2. Update FAQ calzadoslucas mention to quinuaq.com
content = content.replace(
  /ej: calzadoslucas\.com o mifarmacia\.pe/g,
  'ej: quinuaq.com o trankilandia.pe'
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

const beforeHeroLines = lines.slice(0, heroStartIdx);
let afterHeroLines = lines.slice(heroEndIdx);

// Construct the new intelligent hero section
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
              La plataforma todo en uno para digitalizar tu negocio: catálogo web ultrarrápido, pedidos directos y organizados a tu WhatsApp y cobros por Yape o Plin con <strong>0% comisiones por venta</strong>. Creado para marcas y proyectos en Ayacucho y todo el país.
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
                Escribe tu negocio (ej. QuinuaQ, TrankilandiaGym, Mama Alice, Outlet...) para ver la vista previa:
              </p>

              <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 transition shadow-inner">
                <div className="flex items-center flex-1 min-w-0 px-2">
                  <Store className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={businessInput}
                    onChange={(e) => setBusinessInput(e.target.value)}
                    placeholder="Tu negocio (ej. QuinuaQ, TrankilandiaGym, Mama Alice, Outlet...)"
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

          {/* ── COLUMNA DERECHA: Canvas de Estudio Reactivo Inteligente (Span 5) ── */}
          <div className="lg:col-span-5 flex justify-center">

            {(() => {
              const inputLower = businessInput.trim().toLowerCase();
              const cleanSlug = businessInput.trim()
                ? businessInput.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mitienda'
                : 'quinuaq';

              // Clasificación inteligente multi-rubro
              const isNGO = inputLower.includes('mamaalice') || inputLower.includes('mama alice') || inputLower.includes('ong') || inputLower.includes('fundacion') || inputLower.includes('social') || inputLower.includes('donacion');
              const isGym = inputLower.includes('gym') || inputLower.includes('trankilandia') || inputLower.includes('fitness') || inputLower.includes('pesas') || inputLower.includes('crossfit');
              const isOutlet = inputLower.includes('outlet') || inputLower.includes('moda') || inputLower.includes('ropa') || inputLower.includes('boutique') || inputLower.includes('zapatilla') || inputLower.includes('sneaker') || inputLower.includes('streetwear') || inputLower.includes('calzado') || inputLower.includes('jeans');
              const isFood = inputLower.includes('restaurante') || inputLower.includes('restaurant') || inputLower.includes('comida') || inputLower.includes('cafe') || inputLower.includes('cafeteria') || inputLower.includes('polleria') || inputLower.includes('ceviche') || inputLower.includes('pizza') || inputLower.includes('burger') || inputLower.includes('chifa') || inputLower.includes('bar');
              const isTech = inputLower.includes('tech') || inputLower.includes('tecnologia') || inputLower.includes('celular') || inputLower.includes('iphone') || inputLower.includes('laptop') || inputLower.includes('computo') || inputLower.includes('gadgets');
              const isBeauty = inputLower.includes('barber') || inputLower.includes('barberia') || inputLower.includes('salon') || inputLower.includes('spa') || inputLower.includes('belleza') || inputLower.includes('cosmetica') || inputLower.includes('skincare');
              const isMarket = inputLower.includes('market') || inputLower.includes('minimarket') || inputLower.includes('bodega') || inputLower.includes('licor') || inputLower.includes('licoreria') || inputLower.includes('bebida') || inputLower.includes('pisco');
              const isHealth = inputLower.includes('botica') || inputLower.includes('farmacia') || inputLower.includes('salud') || inputLower.includes('dental') || inputLower.includes('clinica');

              const activeData = isNGO ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MAMA ALICE ONG',
                slug: cleanSlug || 'mamaalice',
                tagline: 'ONG & IMPACTO SOCIAL • HUAMANGA, AYACUCHO',
                p1: { name: 'Educación y Niños', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Capacitación y Oficios', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Comunidad Solidaria', img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Donación / Kit Escolar',
                  price: 'S/ 50',
                  img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80'
                }
              } : isGym ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TRANKILANDIAGYM',
                slug: cleanSlug || 'trankilandia',
                tagline: 'FITNESS & CONTROL DE MEMBRESÍAS • AYACUCHO',
                p1: { name: 'Whey Protein Isolate', img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Creatina Monohidratada', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Entrenamiento & Pesas', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Membresía Mensual Libre',
                  price: 'S/ 120',
                  img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80'
                }
              } : isOutlet ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'OUTLET URBANO',
                slug: cleanSlug || 'outlet',
                tagline: 'OUTLET DE MODA & SNEAKERS • TIENDA OFICIAL',
                p1: { name: 'Sneakers Streetwear', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Casaca Denim Street', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Zapatilla Urban Classic', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Sneaker Urbano Streetwear',
                  price: 'S/ 119',
                  img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80'
                }
              } : isTech ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TECH STORE',
                slug: cleanSlug || 'techstore',
                tagline: 'TECNOLOGÍA & ACCESORIOS • ENVÍOS PERÚ',
                p1: { name: 'Audífonos Pro Wireless', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Smartwatch Deportivo', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Gadgets & Carga Rápida', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Audífonos Pro Noise Cancelling',
                  price: 'S/ 89',
                  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
                }
              } : isBeauty ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'STUDIO & BEAUTY',
                slug: cleanSlug || 'studio',
                tagline: 'BELLEZA & CUIDADO PERSONAL • TIENDA OFICIAL',
                p1: { name: 'Sérum Facial Botánico', img: 'https://images.unsplash.com/photo-1608248597359-59750047b4d1?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Cosmética Natural', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Barber & Estética', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Sérum Facial Botánico 50ml',
                  price: 'S/ 48',
                  img: 'https://images.unsplash.com/photo-1608248597359-59750047b4d1?w=300&auto=format&fit=crop&q=80'
                }
              } : isMarket ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MARKET EXPRESS',
                slug: cleanSlug || 'market',
                tagline: 'MINIMARKET & LICORERÍA • DELIVERY EN MINUTOS',
                p1: { name: 'Pack Pisco Quebranta', img: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Vinos & Bebidas', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Snacks & Abarrotes', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Pack Pisco Quebranta + Mixers',
                  price: 'S/ 65',
                  img: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=300&auto=format&fit=crop&q=80'
                }
              } : isHealth ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'BOTICA & SALUD',
                slug: cleanSlug || 'botica',
                tagline: 'BOTICA & SALUD INTEGRAL • ATENCIÓN INMEDIATA',
                p1: { name: 'Multivitamínico Zinc', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Botiquín y Cuidado', img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Suplementos Nutricionales', img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Multivitamínico Zinc + Vitamina C',
                  price: 'S/ 38',
                  img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'
                }
              } : isFood ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'RESTAURANTE & CARTA',
                slug: cleanSlug || 'restaurant',
                tagline: 'GASTRONOMÍA & CARTA QR • PEDIDOS POR WHATSAPP',
                p1: { name: 'Plato Especial a la Carta', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Bebida y Café Pasado', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Parrilla & Especialidad', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Plato a la Carta / Especial',
                  price: 'S/ 32',
                  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80'
                }
              } : {
                // Caso por defecto: QUINUAQ (Restaurante de Campo en Quinua, Ayacucho)
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'QUINUAQ',
                slug: cleanSlug || 'quinuaq',
                tagline: businessInput.trim() ? 'CATÁLOGO DIGITAL & PEDIDOS • AYACUCHO, PERÚ' : 'RESTAURANTE DE CAMPO & CARTA DIGITAL • QUINUA, AYACUCHO',
                p1: { name: 'Trucha Andina a la Parrilla', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Café de Especialidad y Postre', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Parrilla Campestre Tradicional', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: businessInput.trim() ? \`\${businessInput.trim()}\` : 'Trucha Andina a la Parrilla',
                  price: 'S/ 36',
                  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80'
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

        {/* ── BARRA DESLIZANTE INFINITA: Marquee de Nuestros 3 Proyectos Reales ── */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80">
          <p className="text-center text-[11px] sm:text-xs uppercase font-bold tracking-widest text-slate-500 mb-2.5">
            Nuestros 3 proyectos y marcas activas en producción con Qatu Web
          </p>

          {/* Carril de Marquesina Continua */}
          <div className="relative w-full overflow-hidden py-0.5">
            {/* Máscaras de Gradiente en los extremos para desvanecimiento elegante */}
            <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

            <div className="animate-marquee flex items-center gap-4 sm:gap-6">
              {/* Primer bloque de marcas (los 3 proyectos reales repetidos para continuidad de loop) */}
              {[...BRANDS_LIST, ...BRANDS_LIST].map((b, idx) => (
                <div
                  key={\`b1-\${idx}\`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">#{((idx) % 3) + 1}</span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.rubro}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{b.loc}</span>
                </div>
              ))}

              {/* Segundo bloque idéntico para continuidad infinita */}
              {[...BRANDS_LIST, ...BRANDS_LIST].map((b, idx) => (
                <div
                  key={\`b2-\${idx}\`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">#{((idx) % 3) + 1}</span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.rubro}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{b.loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

`;

// 4. Update the Bento Grid section so it reflects the 3 real projects: QuinuaQ, Mama Alice ONG, and TrankilandiaGym
let afterHeroStr = afterHeroLines.join('\n');

const oldBentoStart = afterHeroStr.indexOf('2. BENTO GRID DE LAS 3 VERTICALES OFICIALES');
const oldBentoEnd = afterHeroStr.indexOf('3. MATRIZ COMPARATIVA DE 3 COLUMNAS');

if (oldBentoStart !== -1 && oldBentoEnd !== -1) {
  const bentoHeaderIdx = afterHeroStr.lastIndexOf('{/* =====', oldBentoStart);
  const comparativaHeaderIdx = afterHeroStr.lastIndexOf('{/* =====', oldBentoEnd);

  const newBentoSection = `{/* ============================================================== */}
      {/* 2. BENTO GRID DE LOS 3 PROYECTOS REALES EN AYACUCHO           */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 text-slate-800 border border-slate-300/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nuestros 3 Proyectos Reales en Ayacucho</span>
              <span className="text-slate-400">•</span>
              <span>Casos 100% en Producción</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Sistemas a medida para marcas reales
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Descubre las soluciones creadas por Qatu Web para gastronomía, impacto social y fitness en Ayacucho. Sistemas en vivo con pedidos por WhatsApp y paneles de control inmediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="soluciones">
            {/* Proyecto 1: QuinuaQ */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    Gastronomía de Campo & Carta QR
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    QuinuaQ Restaurante de Campo
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carta digital QR campestre para mesas y pedidos a domicilio en Quinua y Huamanga. Switch de platos agotados en un toque y recepción de comandas automáticas organizadas por WhatsApp sin comisiones abusivas.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>quinuaq.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/pasteleria"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition active:scale-95"
                >
                  <span>Probar Carta Digital QuinuaQ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/pasteleria/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ver Panel de Cocina / Pedidos</span>
                </Link>
              </div>
            </article>

            {/* Proyecto 2: Mama Alice ONG */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-indigo-200" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700">
                    ONG & Formación Social
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Mama Alice ONG
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Plataforma para difusión de proyectos educativos y sociales, registro de voluntarios, canal de donaciones transparentes y catálogo de oficios técnicos de gastronomía y hospitalidad para jóvenes de Ayacucho.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>mamaalice.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/portal"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition active:scale-95"
                >
                  <span>Ver Portal Solidario</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://www.mamaalice.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-50 text-indigo-900 text-xs font-semibold hover:bg-indigo-100 transition"
                >
                  <Globe2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Conocer Proyecto Oficial Mama Alice</span>
                </a>
              </div>
            </article>

            {/* Proyecto 3: Trankilandia Gym */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    Fitness & Control DNI
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Trankilandia Gym
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Control de membresías activas vs vencidas, check-in express escaneando el código de barras del DNI, venta de suplementos deportivos y arqueo de caja diario para counter en Huamanga.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>trankilandia.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/gym"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition active:scale-95"
                >
                  <span>Probar Portal Gym</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/gym/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ver Panel de Turnos / Counter</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      `;

  afterHeroStr = afterHeroStr.slice(0, bentoHeaderIdx) + newBentoSection + afterHeroStr.slice(comparativaHeaderIdx);
  console.log('Successfully updated Bento grid with QuinuaQ, Mama Alice ONG, and TrankilandiaGym!');
}

const finalFileContent = beforeHeroLines.join('\n') + '\n' + newHeroSection + afterHeroStr;
fs.writeFileSync(filePath, finalFileContent, 'utf8');
console.log('Successfully updated MarketingHome.tsx with all requested changes!');
