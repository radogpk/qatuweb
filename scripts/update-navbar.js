const fs = require('fs');

let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Normalize line endings to find safely
const isCRLF = code.includes('\r\n');
if (isCRLF) {
  code = code.replace(/\r\n/g, '\n');
}

const targetDesktop = `          <a
            href="/#demos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            <span>Demos en Vivo</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
              3
            </span>
          </a>`;

const replaceDesktop = `          <a
            href="/#demos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            <span>Demos en Vivo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </a>`;

const targetMobile = `              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                3 disponibles
              </span>`;

const replaceMobile = `              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                En vivo
              </span>`;

if (!code.includes(targetDesktop)) {
  console.error('Target desktop not found!');
  process.exit(1);
}

code = code.replace(targetDesktop, replaceDesktop);
code = code.replace(targetMobile, replaceMobile);

if (isCRLF) {
  code = code.replace(/\n/g, '\r\n');
}

fs.writeFileSync('src/components/layout/Navbar.tsx', code, 'utf8');
console.log('Successfully updated Navbar.tsx');
