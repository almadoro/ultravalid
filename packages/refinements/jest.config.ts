import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  coverageProvider: "babel",
  coverageDirectory: "../../coverage/refinements",
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
  coverageReporters: ["json", "text", "lcov"],
  moduleNameMapper: {
    "@almadoro/uv-refinements": "<rootDir>/src",
    "@almadoro/uv-refinements/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
};

export default config;
