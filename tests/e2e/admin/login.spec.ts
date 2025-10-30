// tests/e2e/admin/login.spec.ts
import { test, expect } from '@playwright/test';

test('admin bisa login dengan identitas', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[data-testid="input-identitas"]', '1111111111');
  await page.fill('[data-testid="input-password"]', '12345');
  await page.click('[data-testid="btn-masuk"]');

  await expect(page).toHaveURL(/admin/);
  await expect(page.locator('[data-testid="page-admin-dasbor"]')).toBeVisible();
});