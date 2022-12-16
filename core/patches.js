/* eslint-env node */
const fs = require("fs/promises");
const path = require("path");

// https://github.com/rollup/plugins/pull/1374
async function patchTerserPlugin() {
  const file = path.resolve(
    "node_modules",
    "@rollup",
    "plugin-terser",
    "dist",
    "es",
    "index.js",
  );
  const original = "__filename";
  const patchComment = "/* Patched to support ESM */";
  const replacement = `${patchComment}fileURLToPath(import.meta.url)`;
  const importCode = "import { fileURLToPath } from 'url';";
  const contents = await fs.readFile(file, "utf8");
  if (!contents.includes(original)) {
    throw new Error(`Patching ${file} failed: Original code not found.`);
  }
  await fs.writeFile(
    file,
    importCode + "\n" + contents.replace(original, replacement),
  );
}

async function main() {
  await patchTerserPlugin();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
