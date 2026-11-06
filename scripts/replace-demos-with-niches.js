const fs = require('fs');

let code = fs.readFileSync('src/components/home/MarketingHome.tsx', 'utf8');

const isCRLF = code.includes('\r\n');
if (isCRLF) {
  code = code.replace(/\r\n/g, '\n');
}

// Find the start of section id="demos"
const sectionStartIndex = code.indexOf('<section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="demos">');
if (sectionStartIndex === -1) {
  console.error('Section start not found!');
  process.exit(1);
}

// Find the end of this section
const sectionEndTag = '</section>';
const sectionEndIndex = code.indexOf(sectionEndTag, sectionStartIndex);
if (sectionEndIndex === -1) {
  console.error('Section end not found!');
  process.exit(1);
}

const sectionLength = sectionEndIndex + sectionEndTag.length - sectionStartIndex;

const newSection = `<section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 text-slate-800 border border-slate-300/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Soluciones por Rubro</span>
              <span className="text-slate-400">•</span>
              <span>Demos 100% Interactivas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Nichos de negocio que transformamos con Qatu Web
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Software especializado y catálogos móviles adaptados al flujo real de tu sector. Prueba las demos en vivo y comprueba la facilidad con la que tus clientes compran y tú administras pedidos desde tu celular.
            </p>
          </div>

          {/* Grilla de los 4 Nichos de Negocio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="soluciones">
            {/* Nicho 1: Moda, Calzado & Boutiques */}
            <article className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                    Moda & Calzado
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">
                    Tiendas de Ropa, Calzado & Accesorios
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Catálogo visual con selector de tallas y variantes de color, zoom en fotos de producto y recepción de pedidos automáticos a WhatsApp con 0% comisiones.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Tallas & Variantes</span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Stock en Vivo</span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/calzados"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Probar Demo Calzado & Moda</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
                <Link
                  href="/demo/calzados/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ver Panel Móvil de Stock</span>
                </Link>
              </div>
            </article>

            {/* Nicho 2: Restaurantes, Cafeterías & Pastelerías */}
            <article className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    Gastronomía & Carta QR
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">
                    Restaurantes, Cafés & Pastelerías
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carta digital QR para mesas o delivery a domicilio. Switch de platos agotados en segundos y recepción de comandas limpias y calculadas directo a WhatsApp.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Mesa & Delivery</span>
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">Comandas WhatsApp</span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/pasteleria"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Probar Carta Gastronómica</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/pasteleria/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ver Panel de Cocina / Pedidos</span>
                </Link>
              </div>
            </article>

            {/* Nicho 3: Gimnasios, Fitness & Membresías */}
            <article className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    Fitness & Membresías
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">
                    Gimnasios, Boxes & Centros Fitness
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cobro de suscripciones mensuales, venta de suplementos deportivos y control de estado de clientes escaneando o ingresando el DNI en counter.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Control DNI</span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">Suplementación</span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/gym"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Probar Portal Fitness & Gym</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/gym/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ver Panel de Counter y Caja</span>
                </Link>
              </div>
            </article>

            {/* Nicho 4: Minimarkets, Ferreterías & Comercio Local */}
            <article className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    Retail & Comercio Local
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">
                    Minimarkets, Ferreterías & Bodegas
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Catálogo para negocios con amplio inventario. Buscador rápido por producto o marca, canasta de compras express y pedidos directos a WhatsApp para despacho o retiro.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">Buscador Rápido</span>
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md">Canasta Express</span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <a
                  href={getWhatsAppUrl('Hola Qatu Web, me gustaría solicitar una demostración o información para un Minimarket / Ferretería / Comercio local.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Pedir Demo para mi Comercio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-200" />
                </a>
                <Link
                  href="/directorio"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50 text-blue-900 text-xs font-semibold hover:bg-blue-100 transition"
                >
                  <Globe2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>Explorar Comercios Activos</span>
                </Link>
              </div>
            </article>
          </div>

          {/* Franja de Autoridad: Marcas Oficiales con Sistemas en Producción */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Marcas Oficiales en Producción</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                Marcas y proyectos reales que operan con sistemas Qatu Web
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Sistemas en vivo conectados con dominios propios y alta disponibilidad en el Perú.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://quinuaq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar quinuaq.com"
              >
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>QuinuaQ</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                  quinuaq.com
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition" />
              </a>

              <a
                href="https://www.mamaalice.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar mamaalice.org"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Mama Alice ONG</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                  mamaalice.org
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition" />
              </a>

              <a
                href="https://trankilandiagym.qatuweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar trankilandiagym.qatuweb.com"
              >
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                <span>TrankilandiaGym</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                  trankilandiagym.qatuweb.com
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition" />
              </a>
            </div>
          </div>
        </div>
      </section>`;

code = code.slice(0, sectionStartIndex) + newSection + code.slice(sectionStartIndex + sectionLength);

if (isCRLF) {
  code = code.replace(/\n/g, '\r\n');
}

fs.writeFileSync('src/components/home/MarketingHome.tsx', code, 'utf8');
console.log('Successfully replaced Bento Grid with 4 Niches and Official Production Strip');
