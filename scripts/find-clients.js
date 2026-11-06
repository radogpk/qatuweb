const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (/\.(tsx?|jsx?|json|css|md)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  c.split('\n').forEach((l, idx) => {
    if (/(quinuaq|mamaalice|trankilandia)/i.test(l)) {
      console.log(`${f}:${idx + 1} -> ${l.trim()}`);
    }
  });
});
