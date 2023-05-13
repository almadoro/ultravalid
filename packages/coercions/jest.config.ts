import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  coverageProvider: "babel",
  coverageDirectory: "../../coverage/coercions",
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
  coverageReporters: ["json", "text", "lcov"],
  moduleNameMapper: {
    "@almadoro/uv-coercions": "<rootDir>/src",
    "@almadoro/uv-coercions/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
};

export default config;
