// tests/e2e/admin/fasilitas.spec.ts
import { test, expect } from '@playwright/test';

test('admin bisa tambah fasilitas baru', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="input-identitas"]', '1111111111');
  await page.fill('[data-testid="input-password"]', '12345');
  await page.click('[data-testid="btn-masuk"]');
  await expect(page).toHaveURL(/admin/);

  await page.click('[data-testid="btn-manajemen-fasilitas"]');
  await expect(page).toHaveURL(/admin\/fasilitas/);

  const initialCount = await page.locator('table tbody tr').count();

  await page.click('[data-testid="btn-tambah-fasilitas"]');
  await expect(page.locator('[data-testid="modal-tambah-fasilitas"]')).toBeVisible();

  await page.selectOption('[data-testid="select-gedung"]', { label: 'Gedung TI dan Sipil' });
  await expect(page.locator('[data-testid="select-lantai"]')).toBeEnabled({ timeout: 10000 });

  await page.selectOption('[data-testid="select-lantai"]', { label: 'Lantai 5 Barat' });
  await expect(page.locator('[data-testid="select-ruang"]')).toBeEnabled({ timeout: 10000 });

  await page.selectOption('[data-testid="select-ruang"]', { label: 'Ruang Teori 01' });
  await page.selectOption('[data-testid="select-barang"]', { label: 'Proyektor' });

  const nomorAkhir = (Date.now() % 100 + 1).toString().padStart(2, '0');
  await page.fill('[data-testid="input-fasilitas-number"]', nomorAkhir);
  await page.selectOption('[data-testid="select-status"]', 'Baik');

  await page.click('[data-testid="btn-simpan-fasilitas"]');

// 1. Tunggu request Livewire
const saveResponse = page.waitForResponse(
  resp => resp.url().includes('livewire/message') && resp.status() === 200,
  { timeout: 15000 }
);

// 2. Tunggu modal hilang
await page.locator('[data-testid="modal-tambah-fasilitas"]').waitFor({
  state: 'hidden',
  timeout: 10000,
});

// 3. Pastikan save selesai
await saveResponse;

// 4. Cari baris baru
const newRow = page.getByRole('row')
  .filter({ hasText: new RegExp(`Ruang Teori 01.*Proyektor.*${nomorAkhir}.*Baik`) })
  .last();

await expect(newRow).toBeVisible({ timeout: 10000 });
await expect(page.locator('table tbody tr')).toHaveCount(initialCount + 1);
});