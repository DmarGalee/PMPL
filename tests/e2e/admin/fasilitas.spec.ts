// tests/e2e/admin/fasilitas.spec.ts
import { test, expect } from '@playwright/test';

test('admin bisa tambah fasilitas baru', async ({ page }) => {
  // 1. Login
  await page.goto('/login');
  await page.fill('[data-testid="input-identitas"]', '1111111111');
  await page.fill('[data-testid="input-password"]', '12345');
  await page.click('[data-testid="btn-masuk"]');
  await expect(page).toHaveURL(/admin/);

  // 2. Buka Fasilitas
  await page.click('[data-testid="btn-manajemen-fasilitas"]');
  await expect(page).toHaveURL(/admin\/fasilitas/);

  // 3. Buka Modal
  await page.click('[data-testid="btn-tambah-fasilitas"]');
  await expect(page.locator('[data-testid="modal-tambah-fasilitas"]')).toBeVisible();

  // 4. Isi form SECARA BERURUT + TUNGGU ENABLED
  // Pilih Gedung
  await page.selectOption('[data-testid="select-gedung"]', '1');
  await page.waitForTimeout(500); // Tunggu Livewire update

  // TUNGGU LANTAI ENABLED
  const lantaiSelect = page.locator('[data-testid="select-lantai"]');
  await lantaiSelect.waitFor({ state: 'visible' });
  await lantaiSelect.waitFor({ state: 'enabled', timeout: 10000 });

  // Pilih Lantai
  await lantaiSelect.selectOption('1');
  await page.waitForTimeout(500);

  // TUNGGU RUANG ENABLED
  const ruangSelect = page.locator('[data-testid="select-ruang"]');
  await ruangSelect.waitFor({ state: 'enabled', timeout: 10000 });
  await ruangSelect.selectOption('1');
  await page.waitForTimeout(500);

  // Pilih Barang
  await page.selectOption('[data-testid="select-barang"]', '1');

  // Isi nomor
  await page.fill('[data-testid="input-fasilitas-number"]', '01');

  // Pilih status
  await page.selectOption('[data-testid="select-status"]', 'Baik');

  // 5. Simpan
  await page.click('[data-testid="btn-simpan-fasilitas"]');

  // 6. Verifikasi
  await expect(page.locator('[data-testid="modal-tambah-fasilitas"]')).toBeHidden();
  await expect(page.locator('text=berhasil disimpan')).toBeVisible({ timeout: 10000 });
});