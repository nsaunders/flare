/* eslint-env node */

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const fs = require("fs/promises");
const path = require("path");
const postcss = require("postcss");

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
  },
});

const outDir = path.join(__dirname, "css");

const main = async () => {
  try {
    await fs.rm(outDir, { recursive: true });
  } catch (_) {
    // This is fine.
  }

  await fs.mkdir(outDir);

  const css = Object.fromEntries(
    await Promise.all(
      Object.entries(require("./src/styles.ts").default).map(
        async ([name, cssIn]) => {
          const { css } = await postcss([autoprefixer, cssnano]).process(
            cssIn,
            { from: undefined },
          );
          return [name, css];
        },
      ),
    ),
  );

  await Promise.all(
    Object.entries(css).map(([name, css]) => {
      return fs.writeFile(path.join(outDir, `${name}.css`), css);
    }),
  );

  console.log("Successfully wrote CSS.");
};

main().catch((err) => console.error(err));
