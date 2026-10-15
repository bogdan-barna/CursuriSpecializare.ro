import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const outDir = '/opt/cursor/artifacts/screenshots';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3001/dashboard/orders', { waitUntil: 'networkidle' });
await page.screenshot({ path: `${outDir}/admincn-reference-dashboard.png`, fullPage: false });

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Admin/i }).first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/cs-admincn-dashboard.png`, fullPage: false });

await page.getByRole('link', { name: 'Înscrieri' }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/cs-admincn-inscrieri.png`, fullPage: false });

await browser.close();
console.log('Screenshots saved to', outDir);
