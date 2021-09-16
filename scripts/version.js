const fs = require("fs/promises");
const path = require("path");
const rootPkg = require("../package.json");
const corePkg = require("../core/package.json");
const mainPkg = require("../main/package.json");
const sitePkg = require("../site/package.json");

const { version } = rootPkg;

(async () => {
  await fs.writeFile(
    path.join(__dirname, "../core/package.json"),
    JSON.stringify({ ...corePkg, version }, null, 2),
  );

  await fs.writeFile(
    path.join(__dirname, "../main/package.json"),
    JSON.stringify(
      {
        ...mainPkg,
        version,
        dependencies: {
          ...mainPkg.dependencies,
          "flare-core": `workspace:${version}`,
        },
      },
      null,
      2
    ),
  );

  await fs.writeFile(
    path.join(__dirname, "../site/package.json"),
    JSON.stringify(
      {
        ...sitePkg,
        version,
        devDependencies: {
          ...sitePkg.devDependencies,
          "flare-core": `workspace:${version}`,
        },
      },
      null,
      2
    ),
  );
})().catch(err => { console.error(err); });
