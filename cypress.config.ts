import { defineConfig } from 'cypress';

export default defineConfig({
	viewportWidth: 1280,
	viewportHeight: 800,
	responseTimeout: 30000,
	e2e: {
		baseUrl: 'http://localhost:4000',
		// port: 4000,
		// specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

		setupNodeEvents(on, config) {
			// implement node event listeners here
		}
	}
});
