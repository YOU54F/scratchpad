module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  testRegex: "src/.*.test.ts",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "\\.ts": "ts-jest"
  },
  testEnvironment: "node",
  reporters: ["default"],
  coverageDirectory: "./coverage",
  collectCoverage: true,
};