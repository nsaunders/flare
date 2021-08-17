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

require("demitasse").css = require("demitasse/extract").css;

const outDir = path.join(__dirname, "css");

const main = async () => {
  try {
    await fs.rm(outDir, { recursive: true });
  } catch (_) {
    // This is fine.
  }

  await fs.mkdir(outDir);

  const { css } = await postcss([autoprefixer, cssnano]).process(
    require("./src/styles.ts").default,
    { from: undefined },
  );
  await fs.writeFile(path.join(outDir, "flare-core.css"), css);

  console.log("Successfully wrote CSS.");
};

main().catch((err) => console.error(err));
