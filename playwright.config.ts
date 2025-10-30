// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { open: 'always', port: 9324 }], // GANTI PORT JADI 9324
    ['list'],
  ],

  use: {
    baseURL: 'http://127.0.0.1:8000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'php artisan serve --port=8000',
    port: 8000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  globalSetup: './tests/e2e/setup.ts',  // PASTIKAN ADA
});