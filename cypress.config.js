const { defineConfig } = require('cypress')

module.exports = defineConfig({
  numTestsKeptInMemory: 50,
  video: false,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 3000,
  requestTimeout: 3000,
  responseTimeout: 3000,
  e2e: {
    supportFile:false,
    specPattern: ["cypress/integration/**/*.feature"],
    baseUrl: 'http://localhost:85', 
    db : {
      "user": "",
      "password":"",
      "host": "",
      "database": "",
      "port": 5432
    },
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
