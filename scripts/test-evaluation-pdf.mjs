import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Admin' }).click();
await page.waitForTimeout(500);
await page.getByRole('link', { name: 'Evaluări' }).click();
await page.getByRole('heading', { name: 'Evaluări cursanți' }).waitFor({ timeout: 15000 });

const downloadPromise = page.waitForEvent('download', { timeout: 60000 });
await page.getByRole('button', { name: 'Salvează PDF' }).first().click();
const download = await downloadPromise;
const name = download.suggestedFilename();
if (!name.endsWith('.pdf')) {
  throw new Error(`Expected .pdf, got ${name}`);
}
console.log('OK:', name);
await browser.close();
