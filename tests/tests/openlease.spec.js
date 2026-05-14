const { test, expect } = require('@playwright/test');

test('dashboard loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('OpenLease Dashboard');
});

test('tenant page displays tenant information', async ({ page }) => {
  await page.goto('/tenants.html');

  await expect(page.locator('body')).toContainText('Sarah Johnson');
  await expect(page.locator('body')).toContainText('Mike Thompson');
});

test('maintenance page displays tickets', async ({ page }) => {
  await page.goto('/maintenance.html');

  await expect(page.locator('body')).toContainText('AC Repair');
  await expect(page.locator('body')).toContainText('Leaky Faucet');
});

test('payments page displays payment statuses', async ({ page }) => {
  await page.goto('/payments.html');

  await expect(page.locator('body')).toContainText('Paid');
  await expect(page.locator('body')).toContainText('Unpaid');
});