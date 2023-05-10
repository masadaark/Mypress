const cypress = require('cypress')
const { specPattern } = require('./runner-config')
const tags = process.argv[2] ? process.argv[2] : '@regression-test'
const spec = process.argv[3] ? process.argv[3] : '**/*.feature'
let runner = specPattern
runner.env = `TAGS=${tags}`
runner.spec = `${spec}`
cypress.run(runner)
  .then((response) => {
    let exitStatus = 0
    if (response.totalFailed > 0) {
      console.error("Total failed: " + response.totalFailed)
      process.exit(1)
    }
    process.exit(exitStatus)
  })
