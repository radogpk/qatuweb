const fs = require('fs');

let code = fs.readFileSync('src/components/home/MarketingHome.tsx', 'utf8');

// Normalize line endings
const isCRLF = code.includes('\r\n');
if (isCRLF) {
  code = code.replace(/\r\n/g, '\n');
}

// 1. Update BRANDS_LIST
const oldBrands = `const BRANDS_LIST = [
  { name: 'QuinuaQ', rubro: 'Restaurante de Campo & Carta QR', loc: 'Quinua, Ayacucho' },
  { name: 'Mama Alice ONG', rubro: 'ONG & Formación Social', loc: 'Huamanga, Ayacucho' },
  { name: 'TrankilandiaGym', rubro: 'Fitness & Control DNI', loc: 'Av. Mariscal Cáceres' },
];`;

const newBrands = `const BRANDS_LIST = [
  {
    name: 'QuinuaQ',
    rubro: 'Restaurante de Campo & Carta QR',
    loc: 'Quinua, Ayacucho',
    web: 'quinuaq.com',
    url: 'https://quinuaq.com',
  },
  {
    name: 'Mama Alice ONG',
    rubro: 'ONG & Formación Social',
    loc: 'Huamanga, Ayacucho',
    web: 'mamaalice.org',
    url: 'https://www.mamaalice.org',
  },
  {
    name: 'TrankilandiaGym',
    rubro: 'Fitness & Control DNI',
    loc: 'Huamanga, Ayacucho',
    web: 'trankilandiagym.qatuweb.com',
    url: 'https://trankilandiagym.qatuweb.com',
  },
];`;

if (code.includes(oldBrands)) {
  code = code.replace(oldBrands, newBrands);
  console.log('Updated BRANDS_LIST');
} else {
  console.error('oldBrands not found!');
}

// 2. Update domain logic in activeData
// Mama Alice
code = code.replace(
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MAMA ALICE ONG',\n                slug: cleanSlug || 'mamaalice',`,
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MAMA ALICE ONG',\n                domain: 'mamaalice.org',\n                slug: cleanSlug || 'mamaalice',`
);

// TrankilandiaGym
code = code.replace(
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TRANKILANDIAGYM',\n                slug: cleanSlug || 'trankilandia',`,
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TRANKILANDIAGYM',\n                domain: 'trankilandiagym.qatuweb.com',\n                slug: cleanSlug || 'trankilandiagym',`
);

// Outlet
code = code.replace(
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'OUTLET URBANO',\n                slug: cleanSlug || 'outlet',`,
  `storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'OUTLET URBANO',\n                domain: \`\${cleanSlug || 'outlet'}.qatuweb.com\`,\n                slug: cleanSlug || 'outlet',`
);

// Default QuinuaQ
code = code.replace(
  `// Caso por defecto: QUINUAQ (Restaurante de Campo en Quinua, Ayacucho)\n                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'QUINUAQ',\n                slug: cleanSlug || 'quinuaq',`,
  `// Caso por defecto: QUINUAQ (Restaurante de Campo en Quinua, Ayacucho)\n                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'QUINUAQ',\n                domain: businessInput.trim() ? \`\${cleanSlug}.qatuweb.com\` : 'quinuaq.com',\n                slug: cleanSlug || 'quinuaq',`
);

// Replace domain display line in canvas
code = code.replace(
  `{activeData.slug}.qatuweb.com`,
  `{activeData.domain || \`\${activeData.slug}.qatuweb.com\`}`
);

// 3. Update Marquee item rendering to show verified web domain and link
const oldMarqueeCard = `<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En vivo
                  </span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.rubro}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{b.loc}</span>`;

const newMarqueeCard = `<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En vivo
                  </span>
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200/90">{b.web}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-slate-500">{b.rubro}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{b.loc}</span>`;

code = code.replaceAll(oldMarqueeCard, newMarqueeCard);

if (isCRLF) {
  code = code.replace(/\n/g, '\r\n');
}

fs.writeFileSync('src/components/home/MarketingHome.tsx', code, 'utf8');
console.log('Successfully updated BRANDS_LIST, domains, and marquee');
