const cypressConfig = require('../cypress.config.js')

const specPattern = {
    env: ``,
    spec: ``,
    e2e: {
      specPattern: {
        testFiles: ["cypress/e2e/**/*.feature"],
        testingType: 'e2e',
        baseUrl: cypressConfig.e2e.baseUrl,
        video: false,
        screenshotOnRunFailure: false
      }
    }
  };

module.exports = {
  specPattern
}
