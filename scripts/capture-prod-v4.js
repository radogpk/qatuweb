const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to live production https://qatupe.vercel.app ...');
  await page.goto('https://qatupe.vercel.app', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({
    path: 'C:/Users/luisg/.gemini/antigravity/brain/c671506d-973e-4c5e-831f-796aa6fe7f3b/02-portada-hero-prod-v4.png',
    clip: { x: 0, y: 0, width: 1440, height: 780 }
  });

  console.log('Screenshot saved to 02-portada-hero-prod-v4.png');
  await browser.close();
})();
