const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'home', 'MarketingHome.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Add BRANDS_LIST right above MarketingHome export if not already there
const brandsDef = `const BRANDS_LIST = [
  { name: 'Calzados Lucas', rubro: 'Comercio & Calzado', loc: 'Jr. Asamblea' },
  { name: 'Restaurante Las Flores', rubro: 'Gastronomía & Carta', loc: 'Jr. Bellido' },
  { name: 'Trankilandia Gym', rubro: 'Fitness & Entrenamiento', loc: 'Av. Mariscal Cáceres' },
  { name: 'Huamanga Coffee', rubro: 'Cafetería de Especialidad', loc: 'Plaza Mayor' },
  { name: 'Boticas del Centro', rubro: 'Salud & Cuidado', loc: 'Jr. 28 de Julio' },
  { name: 'Panadería El Sol', rubro: 'Panadería Artesanal', loc: 'Jr. Callao' },
  { name: 'Ayacucho Moda', rubro: 'Boutique & Ropa', loc: 'Jr. 9 de Diciembre' },
  { name: 'Natural Bio', rubro: 'Productos Orgánicos', loc: 'Jr. Cusco' },
];

export function MarketingHome() {`;

if (!content.includes('const BRANDS_LIST = [')) {
  content = content.replace('export function MarketingHome() {', brandsDef);
}

// Replace brandsList with BRANDS_LIST in the hero marquee
content = content.replaceAll('brandsList.map', 'BRANDS_LIST.map');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added BRANDS_LIST constant to MarketingHome.tsx');
