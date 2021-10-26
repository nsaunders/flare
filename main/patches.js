/* eslint-env node */
const fs = require("fs/promises");

const file = require.resolve("typedoc-plugin-markdown/dist/theme.js");
const original = `const reflectionId = reflection.name.toLowerCase();`;
const patchComment = `/* patched to resolve broken links */`;
const replacement = `${patchComment}let reflectionId = reflection.name.toLowerCase();
            const duplicateAnchors = container.children.filter(x => x.anchor === reflectionId).length;
            if (duplicateAnchors) {
                reflectionId += "-" + duplicateAnchors;
            }`;

async function main() {
  const contents = await fs.readFile(file, "utf8");
  if (contents.includes(patchComment)) {
    return;
  }
  if (!contents.includes(original)) {
    throw new Error(`Patching ${file} failed: Original code not found.`);
  }
  await fs.writeFile(file, contents.replace(original, replacement));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
