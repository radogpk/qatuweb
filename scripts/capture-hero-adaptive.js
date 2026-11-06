const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\luisg\\.gemini\\antigravity\\brain\\c671506d-973e-4c5e-831f-796aa6fe7f3b';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. 1440x900 default view (QuinuaQ)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, '02-portada-hero-quinuaq-1440.png') });
    console.log('Saved: 02-portada-hero-quinuaq-1440.png');
    await page.close();
  }

  // 2. 1366x768 laptop view (testing above-the-fold fit)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, '02-portada-hero-laptop-768-fit.png') });
    console.log('Saved: 02-portada-hero-laptop-768-fit.png');
    await page.close();
  }

  // 3. Simulator typed "TrankilandiaGym" (testing dynamic gym theme)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    await page.type('input[placeholder*="Nombre de tu marca"]', 'TrankilandiaGym');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(artifactDir, '02-portada-hero-trankilandia-gym.png') });
    console.log('Saved: 02-portada-hero-trankilandia-gym.png');
    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
