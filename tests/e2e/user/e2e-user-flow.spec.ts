import { test, expect } from '@playwright/test';
import path from 'path'; // ← Hanya butuh ini

test.describe('Fitur Pelaporan Fasilitas oleh Mahasiswa', () => {
  test('Mahasiswa dapat login dan mengirim laporan kerusakan', async ({ page }) => {
    // 1. Buka halaman login
    await page.goto('http://localhost/PMPL/QA-Simpelfas/public/login', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Masuk/i);

    // 2. Login
    await page.getByRole('textbox', { name: /Identitas/i }).fill('6666666666');
    await page.getByRole('textbox', { name: /Password/i }).fill('12345');
    await page.getByRole('button', { name: /Masuk/i }).click();

    // 3. Redirect ke dashboard
    await expect(page).toHaveURL(/users/i);
    await expect(page.getByRole('link', { name: /Buat Laporan/i })).toBeVisible();

    // 4. Buka form laporan
    await page.getByRole('link', { name: /Buat Laporan/i }).click();
    await expect(page.locator('#pelaporanForm')).toBeVisible({ timeout: 10000 });

    // 5. Isi form
    const searchInput = page.getByPlaceholder('Cari Fasilitas...');
    await searchInput.fill('Ruang Kuliah');
    await page.waitForTimeout(800);
    await page.keyboard.press('Enter');

    // Pilih Skala Kerusakan: Sedang
    await page.getByText('Sedang', { exact: true }).nth(0).click();

    // Pilih Frekuensi: Sedang
    await page.getByText('Sedang', { exact: true }).nth(1).click();

    // Deskripsi
    await page.fill('textarea[name="deskripsi"]', 'Kursi di ruang kuliah rusak dan berderit.');

    // Upload foto — path absolut dari testDir
    await page.setInputFiles(
      'input#foto',
      path.join(process.cwd(), 'tests', 'e2e', 'fixtures', 'kursi-patah.jpg')
    );

    // 6. Kirim laporan
    await page.getByRole('button', { name: /Kirim Laporan/i }).click();

    // Close dropdown
    await page.mouse.click(0, 0);

    // 7. Konfirmasi modal
    const confirmBtn = page.getByRole('button', { name: /Ya, Kirim/i });
    await expect(confirmBtn).toBeVisible({ timeout: 5000 });
    await confirmBtn.click({ force: true });

    // 8. Verifikasi redirect
    await expect(page).toHaveURL(/\/users$/);
    await expect(page.getByRole('link', { name: /Buat Laporan/i })).toBeVisible();
  });
});