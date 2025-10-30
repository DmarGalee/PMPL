// tests/e2e/setup.ts
import { execSync } from 'child_process';

export default async function () {
    console.log('Migrasi ulang & isi data...');

    // Reset DB
    execSync('php artisan migrate:fresh --env=testing', { stdio: 'inherit' });

    // Jalankan seeder dengan URUTAN BENAR
    execSync('php artisan db:seed --class=RoleSeeder --env=testing', { stdio: 'inherit' });
    execSync('php artisan db:seed --class=GedungSeeder --env=testing', { stdio: 'inherit' });
    execSync('php artisan db:seed --class=LantaiSeeder --env=testing', { stdio: 'inherit' }); // DULU!
    execSync('php artisan db:seed --class=RuangSeeder --env=testing', { stdio: 'inherit' });
    execSync('php artisan db:seed --class=BarangSeeder --env=testing', { stdio: 'inherit' });
    execSync('php artisan db:seed --class=UserSeeder --env=testing', { stdio: 'inherit' });
    execSync('php artisan db:seed --class=FasilitasSeeder --env=testing', { stdio: 'inherit' });

    console.log('Database siap untuk E2E!');
}