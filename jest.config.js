/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
  coverageProvider: "babel",
  coverageReporters: ["json", "text", "lcov"],
  moduleNameMapper: {
    "@ultravalid/core": "<rootDir>/packages/core/src",
    "@ultravalid/core/(.*)$": "<rootDir>/packages/core/src/$1",
  },
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"],
};
