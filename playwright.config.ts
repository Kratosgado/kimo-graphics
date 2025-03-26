import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000
	},

	testDir: 'e2e'
});
