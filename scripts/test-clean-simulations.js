const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\luisg\\.gemini\\antigravity\\brain\\c671506d-973e-4c5e-831f-796aa6fe7f3b';

async function setInput(page, text) {
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Tu negocio"]');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await page.type('input[placeholder*="Tu negocio"]', text);
  await new Promise(r => setTimeout(r, 500));
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. TrankilandiaGym
  await setInput(page, 'TrankilandiaGym');
  await page.screenshot({ path: path.join(artifactDir, 'test-clean-trankilandia.png') });
  console.log('Saved: test-clean-trankilandia.png');

  // 2. Outlet Urbano
  await setInput(page, 'Outlet Urbano');
  await page.screenshot({ path: path.join(artifactDir, 'test-clean-outlet.png') });
  console.log('Saved: test-clean-outlet.png');

  await browser.close();
}

run().catch(console.error);
