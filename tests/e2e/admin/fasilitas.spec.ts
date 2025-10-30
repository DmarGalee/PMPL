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

  // 4. Isi form SECARA BERURUT + TUNGGU DATA
  // Pilih Gedung
  await page.selectOption('[data-testid="select-gedung"]', { label: 'Gedung TI dan Sipil' });
  await page.waitForTimeout(1000); // Tunggu Livewire

  // === LANTAI ===
  const lantaiSelect = page.locator('[data-testid="select-lantai"]');
  await expect(lantaiSelect).toBeEnabled({ timeout: 10000 });

  // Tunggu sampai ada opsi (data dimuat)
  const lantaiOptions = lantaiSelect.locator('option');
  await expect(await lantaiOptions.count()).toBeGreaterThan(1);

  await lantaiSelect.selectOption({ label: 'Lantai 5 Barat' });
  await page.waitForTimeout(1000);

  // === RUANG ===
  const ruangSelect = page.locator('[data-testid="select-ruang"]');
  await expect(ruangSelect).toBeEnabled({ timeout: 10000 });

  const ruangOptions = ruangSelect.locator('option');
  await expect(await ruangOptions.count()).toBeGreaterThan(1);

  await ruangSelect.selectOption({ label: 'Ruang Teori 01' });
  await page.waitForTimeout(1000);

  // Pilih Barang
  await page.selectOption('[data-testid="select-barang"]', { label: 'Proyektor' });

  // Isi nomor
  await page.fill('[data-testid="input-fasilitas-number"]', '02');

  // Pilih status
  await page.selectOption('[data-testid="select-status"]', 'Baik');

  // 5. Simpan
  await page.click('[data-testid="btn-simpan-fasilitas"]');

  // 6. Verifikasi
  await expect(page.locator('[data-testid="modal-tambah-fasilitas"]')).toBeHidden();
  await expect(page.locator('text=berhasil disimpan')).toBeVisible({ timeout: 10000 });
});