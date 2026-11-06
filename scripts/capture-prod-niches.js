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
  await new Promise(r => setTimeout(r, 2500));

  // Capture Hero + Marquee
  await page.screenshot({
    path: 'C:/Users/luisg/.gemini/antigravity/brain/c671506d-973e-4c5e-831f-796aa6fe7f3b/02-portada-hero-prod-v5.png',
    clip: { x: 0, y: 0, width: 1440, height: 780 }
  });

  // Scroll to #demos section
  await page.evaluate(() => {
    const el = document.getElementById('demos');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Capture the 4 Niches + Production strip
  const demosBbox = await page.evaluate(() => {
    const el = document.getElementById('demos');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: 0, y: Math.max(0, window.scrollY + r.top), width: 1440, height: r.height };
  });

  if (demosBbox) {
    await page.screenshot({
      path: 'C:/Users/luisg/.gemini/antigravity/brain/c671506d-973e-4c5e-831f-796aa6fe7f3b/03-demos-4-nichos-prod.png',
      clip: demosBbox
    });
    console.log('Saved 03-demos-4-nichos-prod.png');
  }

  console.log('Screenshots complete!');
  await browser.close();
})();
