const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'tests/cypress_tests/**/*.cy.js',
    baseUrl: 'https://www.demoblaze.com',
  },
});
