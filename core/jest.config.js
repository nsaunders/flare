const { defaults: transform } = require("ts-jest/presets");

module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/cjs/", "/esm/", "/umd/"],
  globals: {
    transform,
  },
};
