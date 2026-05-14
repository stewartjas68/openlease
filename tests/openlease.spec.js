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

test('create new tenant workflow', async ({ page }) => {
  await page.goto('/tenants.html');

  await page.fill('#tenantName', 'David Wilson');
  await page.fill('#emailAddress', 'david.wilson@example.com');
  await page.fill('#tenantUnit', '4-3');
  await page.fill('#tenantRent', '1800');

  await page.check('#hasPet');

  await page.fill('#petRent', '45');

  await page.click('#createTenantBtn');

  await expect(page.locator('body')).toContainText('David Wilson');
  await expect(page.locator('body')).toContainText('david.wilson@example.com');
  await expect(page.locator('body')).toContainText('4-3');
  await expect(page.locator('body')).toContainText('$1800');
  await expect(page.locator('body')).toContainText('$45');
});

test('blank tenant submission shows validation error', async ({ page }) => {
  await page.goto('/tenants.html');

  await page.click('#createTenantBtn');

  await expect(page.locator('#errorMessage'))
    .toContainText('All required fields must be completed.');
});

test('duplicate email addresses are rejected', async ({ page }) => {
  await page.goto('/tenants.html');

  await page.fill('#tenantName', 'John Smith');
  await page.fill('#emailAddress', 'sarah.johnson@example.com');
  await page.fill('#tenantUnit', '9-1');
  await page.fill('#tenantRent', '1900');

  await page.click('#createTenantBtn');

  await expect(page.locator('#errorMessage'))
    .toContainText('Duplicate email address detected.');
});

test('duplicate tenant names are allowed', async ({ page }) => {
  await page.goto('/tenants.html');

  await page.fill('#tenantName', 'Sarah Johnson');
  await page.fill('#emailAddress', 'new.sarah@example.com');
  await page.fill('#tenantUnit', '10-2');
  await page.fill('#tenantRent', '2100');

  await page.click('#createTenantBtn');

  await expect(page.locator('body'))
    .toContainText('new.sarah@example.com');
});

test('pet rent required when tenant has pets', async ({ page }) => {
  await page.goto('/tenants.html');

  await page.fill('#tenantName', 'Pet Owner');
  await page.fill('#emailAddress', 'pet.owner@example.com');
  await page.fill('#tenantUnit', '8-4');
  await page.fill('#tenantRent', '1700');

  await page.check('#hasPet');

  await page.click('#createTenantBtn');

  await expect(page.locator('#errorMessage'))
    .toContainText(
      'Pet rent is required when tenant has pets.'
    );
});