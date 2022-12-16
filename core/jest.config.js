module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/cjs/", "/esm/", "/umd/"],
  globals: {
    "ts-jest": {
      tsconfig: {
        target: "es2019",
      },
    },
  },
};
