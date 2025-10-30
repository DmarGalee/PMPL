## Kontribusi Kelompok

| Nama | Tugas |
|------|-------|
| Rangga Dwi Saputra | Test Admin |
| Diana Rahmawati | Test Sarpras |
| Ahmad Naufal Ilham | Test Teknisi |
| Damar Galih Fitrianto | Test User – Pelaporan |
| Chiko Abilla Basya | Test User – Feedback |
| Rangga Dwi Saputra | CI/CD + Dokumentasi |


---
## Struktur File
```bash
tests/
  e2e/
    setup.ts
    admin/
      login.spec.ts
      fasilitas.spec.ts
    sarpra/
      laporan.spec.ts
    teknisi/
      perbaikan.spec.ts
    user/
      pelaporan.spec.ts
      feedback.spec.ts
```

## Fitur yang Dites (E2E)

| Role | Fitur |
|------|------|
| **Admin** | Login, Tambah Fasilitas (Livewire Modal) |
| **Sarpras** | Lihat & Filter Fasilitas |
| **Teknisi** | Ambil & Selesaikan Perbaikan |
| **User** | Lapor Kerusakan + Feedback |

---

## Cara Menjalankan Testing

### 1. **Persiapan Awal**

```bash
# Clone repo
git clone https://github.com/username/pmpl.git
cd pmpl

# Install dependencies
composer install
npm install

# Setup .env
cp .env.example .env
php artisan key:generate

# Migrate + Seed
php artisan migrate --seed
```
### 2. **Jalankan Server**
```bash
php artisan serve
```

### 3. **Jalankan Test E2E**
```bash 
# Semua test
npx playwright test

# Perbagian
npx playwright test tests/e2e/[role]/[fitur].spec.ts
ex: npx playwright test tests/e2e/admin/fasilitas.spec.ts

# Dengan UI (lihat browser)
npx playwright test --ui

# Dengan report HTML
npm run test:full
```
