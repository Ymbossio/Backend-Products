module.exports = {
  testEnvironment: "node",
  transform: {
    ...require("ts-jest").createDefaultPreset().transform,
  },
  // testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.test.tsx", "**/tests/**/*.unit.ts"],

  collectCoverage: true,          
  coverageDirectory: "coverage", 
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts", 
    "!src/**/types.ts",
  ],
};
