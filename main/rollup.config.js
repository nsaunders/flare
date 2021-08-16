import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const umd = {
  format: "umd",
  file: `umd/${pkg.name}.js`,
  name: pkg.name.replace(/(^|-)([a-z])/g, (_a, _b, x) => x.toUpperCase()),
  globals: {
    "flare-core": "FlareCore",
    react: "React",
    "react-dom": "ReactDOM",
  },
  sourcemap: true,
};

export default {
  input: "./src/index.ts",
  external: ["flare-core", "react", "react-dom"],
  plugins: [typescript({ sourceMap: true, target: "es5" })],
  output: [
    umd,
    {
      ...umd,
      file: umd.file.replace(/\.js$/, ".min.js"),
      plugins: [terser()],
    },
  ],
};
