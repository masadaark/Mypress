const cypress = require('cypress');
const envConfig = require('./configEnv.json') 
const env = envConfig.db;

const { specPattern } = {
  specPattern: {
    testFiles: ['cypress/e2e/**/*.feature'],
    testingType: 'e2e',
    video: false,
    numTestsKeptInMemory: 0,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
  },
};

async function runTests() {
  await cypress.open({
    env,
    e2e: {
      specPattern,
    },
  });
}

runTests();