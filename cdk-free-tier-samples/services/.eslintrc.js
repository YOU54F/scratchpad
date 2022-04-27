const base = require("../base.eslint.config");

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: ["tsconfig.json"],
  },
};
