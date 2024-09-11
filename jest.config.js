/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
