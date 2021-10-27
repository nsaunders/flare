const fs = require("fs/promises");
const path = require("path");

async function patch(dir) {
  const pkg = path.join(dir, "package.json");
  const contents = await fs.readFile(pkg, "utf8");
  const toRemove = `"type": "module",`;
  if (contents.includes(toRemove)) {
    await fs.writeFile(pkg, contents.replace(toRemove, ""));
  }
}

const dirs = [
  "rehype-slug",
  "hast-util-has-property",
  "hast-util-heading-rank",
  "hast-util-to-string",
  "unist-util-visit",
  "unist-util-visit-parents",
  "unist-util-is",
].map((x) => path.dirname(require.resolve(x)));

async function main() {
  for (let dir of dirs) {
    await patch(dir);
  }
}

main().catch((err) => {
  console.error(err);
});
