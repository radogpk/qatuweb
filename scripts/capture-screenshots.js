const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const os = require('os');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DESKTOP_DIR = path.join(os.homedir(), 'Desktop', 'qatuweb-capturas');
const BASE_URL = 'https://qatupe.vercel.app';

if (!fs.existsSync(DESKTOP_DIR)) {
  fs.mkdirSync(DESKTOP_DIR, { recursive: true });
}

// Limpiar test previo si existe
const testFile = path.join(os.homedir(), 'Desktop', 'test-edge.png');
if (fs.existsSync(testFile)) {
  try { fs.unlinkSync(testFile); } catch (e) {}
}

const CAPTURES = [
  {
    name: '01-portada-completa-desktop.png',
    url: `${BASE_URL}/`,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    fullPage: true,
    delay: 1500,
  },
  {
    name: '02-portada-hero-desktop.png',
    url: `${BASE_URL}/`,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '03-portada-mobile.png',
    url: `${BASE_URL}/`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '04-planes-y-precios-desktop.png',
    url: `${BASE_URL}/planes`,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    fullPage: true,
    delay: 1500,
  },
  {
    name: '05-planes-y-precios-mobile.png',
    url: `${BASE_URL}/planes`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: true,
    delay: 1500,
  },
  {
    name: '06-demo-calzados-tienda-mobile.png',
    url: `${BASE_URL}/demo/calzados`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '07-demo-calzados-panel-bolsillo-mobile.png',
    url: `${BASE_URL}/demo/calzados/admin`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '08-demo-pasteleria-carta-mobile.png',
    url: `${BASE_URL}/demo/pasteleria`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '09-demo-pasteleria-panel-cocina-mobile.png',
    url: `${BASE_URL}/demo/pasteleria/admin`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '10-demo-gym-fitness-mobile.png',
    url: `${BASE_URL}/demo/gym`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '11-demo-gym-panel-counter-mobile.png',
    url: `${BASE_URL}/demo/gym/admin`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: false,
    delay: 1500,
  },
  {
    name: '12-login-acceso-clientes.png',
    url: `${BASE_URL}/login`,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    fullPage: false,
    delay: 1000,
  },
  {
    name: '13-dashboard-super-admin-hub.png',
    url: `${BASE_URL}/dashboard/admin`,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    fullPage: true,
    delay: 2000,
  },
  {
    name: '14-dashboard-cliente-renovacion.png',
    url: `${BASE_URL}/dashboard/cliente`,
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    fullPage: true,
    delay: 1500,
  },
];

async function run() {
  console.log(`🚀 Iniciando captura de pantalla con Edge Chromium...`);
  console.log(`📁 Carpeta de destino: ${DESKTOP_DIR}`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
    ],
  });

  const page = await browser.newPage();

  for (let i = 0; i < CAPTURES.length; i++) {
    const item = CAPTURES[i];
    const outputPath = path.join(DESKTOP_DIR, item.name);
    console.log(`[${i + 1}/${CAPTURES.length}] Capturando ${item.name} (${item.url})...`);

    try {
      await page.setViewport(item.viewport);
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      if (item.delay) {
        await new Promise((r) => setTimeout(r, item.delay));
      }
      await page.screenshot({ path: outputPath, fullPage: item.fullPage });
      console.log(`   ✅ Guardado: ${item.name}`);
    } catch (err) {
      console.error(`   ❌ Error en ${item.name}:`, err.message);
    }
  }

  await browser.close();
  console.log(`\n🎉 ¡Todas las capturas se guardaron con éxito en:`);
  console.log(`${DESKTOP_DIR}\n`);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
