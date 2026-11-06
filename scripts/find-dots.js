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
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  c.split('\n').forEach((l, idx) => {
    if (l.includes('animate-pulse') || (l.includes('rounded-full bg-emerald') && !l.includes('w-3 h-3 sm:w-3.5'))) {
      console.log(`${f}:${idx + 1} -> ${l.trim()}`);
    }
  });
});
