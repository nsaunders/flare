import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

const umd = {
  format: "umd",
  file: `umd/${pkg.name}.js`,
  name: pkg.name.replace(/(^|-)([a-z])/g, (_a, _b, x) => x.toUpperCase()),
  globals: {
    react: "React",
  },
  sourcemap: true,
};

export default {
  input: "./src/index.tsx",
  external: ["react"],
  plugins: [
    commonjs(),
    resolve({ include: "node_modules/demitasse/**" }),
    typescript({ sourceMap: true, target: "es5" }),
  ],
  output: [
    umd,
    {
      ...umd,
      file: umd.file.replace(/\.js$/, ".min.js"),
      plugins: [terser()],
    },
  ],
};
