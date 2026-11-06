const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Accent normalization for domain
content = content.replace(
  /\$\{businessInput\.toLowerCase\(\)\.replace\(\/\[\^a-z0-9\]\/g, ''\) \|\| 'mitienda'\}/g,
  "${businessInput.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mitienda'}"
);

// 2. Dynamic typography for brand name
const oldBrandJSX = `<span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase block select-none truncate px-2">
                      {businessInput.trim() ? businessInput.trim().toUpperCase() : 'LUCAS'}
                    </span>`;

const newBrandJSX = `<span className={\`font-black tracking-tighter text-slate-900 uppercase block select-none px-2 leading-none \${
                      businessInput.trim().length > 12
                        ? 'text-xl sm:text-2xl lg:text-3xl'
                        : 'text-3xl sm:text-4xl lg:text-5xl'
                    }\`}>
                      {businessInput.trim() ? businessInput.trim().toUpperCase() : 'LUCAS'}
                    </span>`;

if (content.includes(oldBrandJSX)) {
  content = content.replace(oldBrandJSX, newBrandJSX);
  console.log('Replaced brand name typography with dynamic scaling!');
} else {
  console.log('Old brand JSX not found, trying regex...');
  content = content.replace(
    /<span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase block select-none truncate px-2">[\s\S]*?<\/span>/,
    newBrandJSX
  );
  console.log('Applied via regex replacement!');
}

// 3. Floating card title without extra words
content = content.replace(
  `{businessInput.trim() ? \`\${businessInput} Exclusivo\` : 'Botín Cuero Caña Alta'}`,
  `{businessInput.trim() ? businessInput.trim() : 'Botín Cuero Caña Alta'}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Applied micro-polish to MarketingHome.tsx!');
