const { resolve } = require("path");

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: resolve(__dirname, "coverage"),
  transform: {},

  rootDir: "./src",
  testEnvironment: "node",

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
