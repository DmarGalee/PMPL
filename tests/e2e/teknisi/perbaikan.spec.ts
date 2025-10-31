import { test, expect } from '@playwright/test';

test.describe('E2E Teknisi - Perbaikan', () => {

  test('Teknisi ubah status perbaikan menjadi selesai', async ({ page }) => {

    // 1. Login sebagai teknisi
    await page.goto('/login');
    await page.fill('[data-testid="login-nik"]', '3333333333');
    await page.fill('[data-testid="login-password"]', '12345');
    await page.click('[data-testid="login-submit"]');
    await page.waitForURL('/teknisi');

    // 2. Buka daftar tugas
    await page.click('[data-testid="menu-perbaikan"]');
    await expect(page.locator('[data-testid="table-perbaikan"]')).toBeVisible();

    // 3. Klik salah satu tugas
    await page.click('[data-testid="perbaikan-item-1"]');
    await expect(page.locator('[data-testid="detail-perbaikan"]')).toBeVisible();

    // 4. Update status: Diproses
    await page.selectOption('[data-testid="status-select"]', 'Diproses');
    await page.click('[data-testid="btn-update-status"]');

    await expect(page.getByText('Status berhasil diperbarui')).toBeVisible();

    // 5. Update status: Selesai
    await page.selectOption('[data-testid="status-select"]', 'Selesai');
    await page.click('[data-testid="btn-update-status"]');

    await expect(page.getByText('Status berhasil diperbarui')).toBeVisible();

    // 6. Cek riwayat
    await page.click('[data-testid="tab-riwayat"]');
    await expect(page.getByText('Selesai')).toBeVisible();
  });

});
