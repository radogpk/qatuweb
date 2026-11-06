const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Replace the marquee heading
content = content.replace(
  'Nuestros 3 proyectos y marcas activas en producción con Qatu Web',
  'Marcas y proyectos activos que confían en Qatu Web'
);

// 2. Remove the "#{((idx) % 3) + 1}" numbering in the marquee items and replace with a sleek "En vivo" pulse badge
const oldNumbering1 = `<span className="text-[10px] text-emerald-600 font-mono font-bold">#{((idx) % 3) + 1}</span>`;
const newBadge1 = `<span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En vivo
                  </span>`;

content = content.replaceAll(oldNumbering1, newBadge1);

// 3. In Bento grid badge, replace "Nuestros 3 Proyectos Reales en Ayacucho"
content = content.replace(
  '<span>Nuestros 3 Proyectos Reales en Ayacucho</span>',
  '<span>Casos de Éxito en Producción</span>'
);

// 4. In Bento comment header
content = content.replace(
  '2. BENTO GRID DE LOS 3 PROYECTOS REALES EN AYACUCHO',
  '2. BENTO GRID DE CASOS DE ÉXITO EN PRODUCCIÓN'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed limiting "3" references from marquee and bento grid!');
