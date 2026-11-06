const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Clean any lingering mojibake like Â¿
content = content.replaceAll('Â¿', '¿');

// Locate hero boundaries
const lines = content.split('\n');
let returnLineIdx = -1;
let bentoLineIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('return (') && i > 150 && returnLineIdx === -1) {
    returnLineIdx = i;
  }
  if (lines[i].includes('2. BENTO GRID DE LAS 3 VERTICALES OFICIALES')) {
    bentoLineIdx = i - 1;
  }
}

if (returnLineIdx === -1 || bentoLineIdx === -1) {
  console.error('Boundaries not found! returnLineIdx:', returnLineIdx, 'bentoLineIdx:', bentoLineIdx);
  process.exit(1);
}

console.log(`Replacing lines ${returnLineIdx} to ${bentoLineIdx}`);

const beforeLines = lines.slice(0, returnLineIdx);
const afterLines = lines.slice(bentoLineIdx);

// Add businessNameInput state before the return if not present
let beforeHeroCode = beforeLines.join('\n');
if (!beforeHeroCode.includes('const [businessInput, setBusinessInput]')) {
  beforeHeroCode = beforeHeroCode.replace(
    '  const [stockToast, setStockToast] = useState<string | null>(null);',
    `  const [stockToast, setStockToast] = useState<string | null>(null);
  const [businessInput, setBusinessInput] = useState('');`
  );
}

const newHeroBlock = `  const handleQuickLead = (e: React.FormEvent) => {
    e.preventDefault();
    const query = businessInput.trim()
      ? \`Hola Qatu Web, quiero crear la tienda web para mi negocio: \${businessInput} en Ayacucho.\`
      : 'Hola Qatu Web, quiero solicitar información para digitalizar mi negocio en Ayacucho.';
    window.open(getWhatsAppUrl(query), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FFFFFF] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased overflow-x-hidden">

      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO SHOPIFY (ALTA CONVERSIÓN & SEO/GEO) */}
      {/* ============================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica sutil de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Resplandor ambiental de alta gama */}
        <div className="absolute top-1/3 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ── COLUMNA IZQUIERDA: Titular SEO/GEO + Formulario Estilo Shopify (Span 7) ── */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Píldora de Autoridad Local & GEO */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-medium shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Comercio Digital en Huamanga, Ayacucho</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Entrega en 24 Horas
              </span>
            </div>

            {/* Titular Principal — Máximo Impacto SEO y Claridad Comercial */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-950 tracking-tight leading-[1.06]">
              La plataforma de comercio web donde crecen los negocios de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Ayacucho.
              </span>
            </h1>

            {/* Subtítulo con Densidad Semántica (SEO Local) */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
              Crea tu tienda online profesional con dominio propio, catálogo móvil de carga instantánea y sistema de comandas a WhatsApp con pagos directos por Yape o Plin. <strong>0% comisiones por venta</strong> y asesoría presencial en Huamanga.
            </p>

            {/* Formulario de Captura Rápida Estilo Shopify */}
            <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl mx-auto lg:mx-0 pt-1">
              <div className="relative flex-1">
                <Store className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={businessInput}
                  onChange={(e) => setBusinessInput(e.target.value)}
                  placeholder="Nombre de tu negocio (ej. Calzados Lucas)"
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition active:scale-95 shrink-0"
              >
                <span>Crear mi Tienda</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </form>

            {/* Micro-Garantías de Confianza Comercial */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                0% Comisiones por venta
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Tu dominio tunegocio.qatuweb.com
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Soporte presencial en Huamanga
              </span>
            </div>

            {/* Enlace directo a ver las 3 demos en su sección dedicada */}
            <div className="pt-2 text-xs sm:text-sm text-slate-500">
              ¿Quieres probar un negocio en vivo?{' '}
              <a href="#demos" className="font-bold text-slate-900 hover:text-emerald-700 underline decoration-slate-300 hover:decoration-emerald-500 transition">
                Explorar las 3 Demos por Rubro abajo &darr;
              </a>
            </div>

          </div>

          {/* ── COLUMNA DERECHA: Escaparate de Comercio Ejecutivo (Shopify Style) (Span 5) ── */}
          <div className="lg:col-span-5 flex justify-center">

            {/* Tarjeta de Sistema de Comercio — Totalmente Cuadrada y sin desbordes */}
            <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-6 space-y-5 relative">

              {/* Barra Superior de Dominio & Estado del Servidor */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-700">
                    calzadoslucas.qatuweb.com
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  En Vivo • Huamanga
                </span>
              </div>

              {/* Métrica Ejecutiva de Ventas (Shopify Performance Card) */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Ventas acumuladas del mes</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +38% vía WhatsApp
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    S/ 12,450.00
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    42 pedidos cerrados
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Comisión descontada a la tienda:</span>
                  <strong className="text-emerald-400 font-bold">S/ 0.00 (100% tuyo)</strong>
                </div>
              </div>

              {/* Notificación de Pedido en WhatsApp en Tiempo Real */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      WhatsApp Business (Dueño)
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">Hace 2 min</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>✅ Nuevo Pedido #042</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      Pagado con Yape
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    1x Botín de Cuero Huamanga (Talla 38) — <strong>S/ 120.00</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    📍 Entrega: Jr. 28 de Julio 145, Huamanga
                  </p>
                </div>
              </div>

              {/* Fila de Certificación Técnica Local */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Base de datos aislada por cliente
                </span>
                <span className="text-slate-700 font-bold">Ayacucho, PE</span>
              </div>

            </div>

          </div>

        </div>

        {/* ── CINTILLO INFERIOR: Comercios y Negocios Activos en Huamanga (Shopify Merchant Grid) ── */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-200/80">
          <p className="text-center text-xs uppercase font-bold tracking-wider text-slate-600 mb-5">
            Impulsando a comerciantes y marcas independientes en Ayacucho
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-slate-700">
            <div className="flex items-center gap-2 hover:text-slate-950 transition">
              <Store className="w-4 h-4 text-slate-500" />
              <span>Calzados Lucas Huamanga (Jr. Asamblea)</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 hover:text-slate-950 transition">
              <Utensils className="w-4 h-4 text-slate-500" />
              <span>Restaurante Las Flores (Jr. Bellido)</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 hover:text-slate-950 transition">
              <Dumbbell className="w-4 h-4 text-slate-500" />
              <span>Trankilandia Gym (Av. Mariscal Cáceres)</span>
            </div>
          </div>
        </div>

      </section>
`;

const finalFileLines = [beforeHeroCode, newHeroBlock, ...afterLines];
const finalContent = finalFileLines.join('\n');

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Shopify-inspired Hero successfully injected!');
