if (!(".ts" in require.extensions)) {
  require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {
      jsx: "react",
    },
  });
}
if (!(".mdx" in require.extensions)) {
  require.extensions[".mdx"] = function () {
    /*noop*/
  };
}
const redirect = () => {
  const { css } = require("demitasse");
  require("demitasse").css = require("demitasse/extract").css;
  return () => {
    require("demitasse").css = css;
  };
};
const stylesPath = require.resolve("./styles.ts");
require = require("esm")(module);
module.exports = () => {
  const cleanup = redirect();
  const code = Object.values(require(stylesPath))
    .flatMap((x) => {
      switch (typeof x) {
        case "object":
          return Object.values(x);
        case "string":
          return [x];
        default:
          return [];
      }
    })
    .join("\n");
  const dependencies = module.children
    .filter(({ filename }) => filename.endsWith("/styles.ts"))
    .flatMap(({ children }) => children)
    .map(({ filename }) => filename)
    .concat(stylesPath);
  dependencies.forEach((key) => {
    delete require.cache[key];
  });
  cleanup();
  return { code, dependencies };
};
