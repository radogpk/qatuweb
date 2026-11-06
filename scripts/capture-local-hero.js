const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\luisg\\.gemini\\antigravity\\brain\\c671506d-973e-4c5e-831f-796aa6fe7f3b';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const out1 = path.join(artifactDir, '02-portada-hero-grand-desktop.png');
  await page.screenshot({ path: out1, fullPage: false });
  console.log('Saved:', out1);

  // Type in simulator to test reactive binding
  await page.type('input[placeholder*="Nombre de tu marca"]', 'Qori Artesanías');
  await new Promise(r => setTimeout(r, 800));

  const out2 = path.join(artifactDir, '02-portada-hero-grand-simulator.png');
  await page.screenshot({ path: out2, fullPage: false });
  console.log('Saved:', out2);

  await browser.close();
}

run().catch(console.error);
