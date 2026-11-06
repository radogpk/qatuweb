const fs = require('fs');

// 1. Update Navbar.tsx
let navbar = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
const isNavbarCRLF = navbar.includes('\r\n');
if (isNavbarCRLF) navbar = navbar.replace(/\r\n/g, '\n');

// Remove dot in logo badge
navbar = navbar.replace(
  `<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">\n                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />\n                <span>Huamanga, Ayacucho</span>\n              </span>`,
  `<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">\n                <span>Huamanga, Ayacucho</span>\n              </span>`
);

// Remove dot in desktop nav link
navbar = navbar.replace(
  `<a\n            href="/#demos"\n            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"\n          >\n            <span>Demos en Vivo</span>\n            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />\n          </a>`,
  `<a\n            href="/#demos"\n            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"\n          >\n            Demos en Vivo\n          </a>`
);

// Remove dot in mobile nav
navbar = navbar.replace(
  `<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">\n                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />\n                En vivo\n              </span>`,
  `<span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">\n                Interactivas\n              </span>`
);

if (isNavbarCRLF) navbar = navbar.replace(/\n/g, '\r\n');
fs.writeFileSync('src/components/layout/Navbar.tsx', navbar, 'utf8');
console.log('Updated Navbar.tsx');


// 2. Update MarketingHome.tsx
let home = fs.readFileSync('src/components/home/MarketingHome.tsx', 'utf8');
const isHomeCRLF = home.includes('\r\n');
if (isHomeCRLF) home = home.replace(/\r\n/g, '\n');

// Remove dot in simulator box header
home = home.replace(
  `<div className="flex items-center gap-2">\n                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />\n                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">\n                    Simula tu tienda en vivo\n                  </span>\n                </div>`,
  `<div className="flex items-center gap-2">\n                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">\n                    Simula tu tienda en vivo\n                  </span>\n                </div>`
);

// Remove dot in canvas store header
home = home.replace(
  `<span className="text-emerald-700 font-sans font-bold flex items-center gap-1.5 shrink-0 text-xs">\n                          <span className="w-2 h-2 rounded-full bg-emerald-500" />\n                          En línea\n                        </span>`,
  `<span className="text-slate-500 font-sans font-semibold text-xs shrink-0">\n                          Tienda Oficial\n                        </span>`
);

// Remove "En vivo" dot badge in marquee items
const oldMarqueeTag = `<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md shrink-0">\n                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />\n                    En vivo\n                  </span>\n                  <span className="text-slate-900 font-black">{b.name}</span>`;

const newMarqueeTag = `<span className="text-slate-900 font-black">{b.name}</span>`;

home = home.replaceAll(oldMarqueeTag, newMarqueeTag);

// Remove dot in authority strip badge
home = home.replace(
  `<div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">\n                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />\n                <span>Marcas Oficiales en Producción</span>\n              </div>`,
  `<div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200">\n                <span>Marcas Oficiales en Producción</span>\n              </div>`
);

if (isHomeCRLF) home = home.replace(/\n/g, '\r\n');
fs.writeFileSync('src/components/home/MarketingHome.tsx', home, 'utf8');
console.log('Updated MarketingHome.tsx');
