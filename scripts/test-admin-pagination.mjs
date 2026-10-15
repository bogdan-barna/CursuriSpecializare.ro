import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

await page.evaluate(() => localStorage.removeItem('cs-admin-inscrieri-v1'));

await page.reload({ waitUntil: 'networkidle' });

const adminBtn = page.getByRole('button', { name: /^Admin$/i }).first();
await adminBtn.click();

await page.waitForSelector('text=Înscrieri la cursuri');

const firstPageName = await page.locator('tbody tr').first().locator('td').first().innerText();
const range1 = await page.locator('text=/Afișare 1–10 din/').textContent();

await page.getByRole('button', { name: 'Pagina 2' }).click();
await page.waitForTimeout(300);

const secondPageName = await page.locator('tbody tr').first().locator('td').first().innerText();
const range2 = await page.locator('text=/Afișare 11–20 din/').textContent();

console.log(JSON.stringify({ firstPageName, secondPageName, range1, range2, changed: firstPageName !== secondPageName }, null, 2));

await browser.close();
