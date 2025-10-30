// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  reporter: [
    ['html', { open: 'never' }], // Simpan tanpa buka otomatis
    ['json', { outputFile: 'results.json' }],
  ],
  use: {
    baseURL: 'http://localhost/PMPL/QA-Simpelfas/public',
    headless: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',     use: { ...devices['Desktop Edge'] } },
  ],
});