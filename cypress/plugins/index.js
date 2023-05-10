const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const dbConnection = require('./db_connection.js')

module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)
  on('file:preprocessor', createBundler({ plugins: [nodePolyfills(), createEsbuildPlugin(config)]}));
  on('task', { dbQuery: dbConnection.pgQuery});
  require("cypress-localstorage-commands/plugin")(on, config);
  return config
}