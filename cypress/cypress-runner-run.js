const cypress = require('cypress');
const tags = process.argv[2] ? process.argv[2] : '@regression-test'
const feature = process.argv[3] ? process.argv[3] : '**/*.feature'

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
  await cypress.run({
    env:`TAGS=${tags}`,
    spec:`${feature}`,
    e2e: {
      specPattern,
    },
  });
}

runTests().then((response) => {
  if (response.totalFailed > 0) {
    console.error("Scenario failed: " + response.totalFailed)
    process.exit(1)
  } else {
    process.exit(0)
  }
})
;