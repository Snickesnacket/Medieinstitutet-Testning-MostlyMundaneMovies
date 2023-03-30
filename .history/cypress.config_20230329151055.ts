import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
	 baseUrl: 'https://mostly-mundane-movies.netlify.app/,
      // implement node event listeners here
    },
  },
});
