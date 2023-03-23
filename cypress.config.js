const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 2560,
  viewportHeight: 1440,
  video: false,
  numTestsKeptInMemory: 0,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 15000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  recoverFromRendererCrashes: true,
  chromeWebSecurity:false,
  e2e: {
    specPattern: ["cypress/integration/**/*.feature"],
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  }
});


