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

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Default QuinuaQ
  await page.screenshot({ path: path.join(artifactDir, 'test-01-quinuaq-restaurant.png') });
  console.log('Saved: test-01-quinuaq-restaurant.png');

  // 2. Type "Mama Alice"
  await page.click('input[placeholder*="Tu negocio"]', { clickCount: 3 });
  await page.type('input[placeholder*="Tu negocio"]', 'Mama Alice ONG');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test-02-mama-alice-ong.png') });
  console.log('Saved: test-02-mama-alice-ong.png');

  // 3. Type "TrankilandiaGym"
  await page.click('input[placeholder*="Tu negocio"]', { clickCount: 3 });
  await page.type('input[placeholder*="Tu negocio"]', 'TrankilandiaGym');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test-03-trankilandia-gym.png') });
  console.log('Saved: test-03-trankilandia-gym.png');

  // 4. Type "Outlet Urbano"
  await page.click('input[placeholder*="Tu negocio"]', { clickCount: 3 });
  await page.type('input[placeholder*="Tu negocio"]', 'Outlet Urbano');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test-04-outlet-urbano.png') });
  console.log('Saved: test-04-outlet-urbano.png');

  // 5. Scroll to Bento Grid (#demos)
  await page.evaluate(() => {
    document.getElementById('demos')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'test-05-bento-real-projects.png') });
  console.log('Saved: test-05-bento-real-projects.png');

  await browser.close();
}

run().catch(console.error);
