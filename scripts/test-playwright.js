const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureAllDemos() {
  const outputDir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  const demos = [
    { slug: 'calzados', name: 'calzados.png' },
    { slug: 'pasteleria', name: 'pasteleria.png' },
    { slug: 'polleria', name: 'polleria.png' },
    { slug: 'gym', name: 'gym.png' },
    { slug: 'belleza', name: 'belleza.png' },
    { slug: 'licoreria', name: 'licoreria.png' },
  ];

  for (const demo of demos) {
    const url = `http://localhost:3005/demo/${demo.slug}`;
    console.log(`Capturing ${url} -> ${demo.name}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    // Esperar a que se carguen fuentes e imágenes
    await page.waitForTimeout(600);
    const dest = path.join(outputDir, demo.name);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`Saved screenshot to ${dest}`);
  }

  await browser.close();
  console.log('All 6 demo showcases captured successfully!');
}

captureAllDemos().catch((err) => {
  console.error(err);
  process.exit(1);
});
