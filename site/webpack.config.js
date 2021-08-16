const HtmlPlugin = require("html-webpack-plugin");
const HtmlDeployPlugin = require("html-webpack-deploy-plugin");
const RemarkHTML = require("remark-html");
const path = require("path");

module.exports = ({ production }) => {
  const overrides = production
    ? { mode: "production", devtool: "source-map" }
    : {};
  return {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.ts",
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    plugins: [
      new HtmlPlugin({ title: "Flare" }),
      new HtmlDeployPlugin({
        packages: {
          react: {
            copy: [
              {
                from: `umd/react.${
                  production ? "production.min" : "development"
                }.js`,
                to: "react.js",
              },
            ],
            scripts: [
              {
                path: "react.js",
                cdnPath: `umd/react.${
                  production ? "production.min" : "development"
                }.js`,
              },
            ],
          },
          "react-dom": {
            copy: [
              {
                from: `umd/react-dom.${
                  production ? "production.min" : "development"
                }.js`,
                to: "react-dom.js",
              },
            ],
            scripts: [
              {
                path: "react-dom.js",
                cdnPath: `umd/react-dom.${
                  production ? "production.min" : "development"
                }.js`,
              },
            ],
          },
          "flare": {
            copy: [{ from: `css/flare.css`, to: "css/flare.css" }],
            links: [{ path: "css/flare.css" }],
          },
        },
        append: false,
        useCdn: production,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            "raw-loader",
            {
              loader: "remark-loader",
              options: { remarkOptions: { plugins: [RemarkHTML] } },
            },
          ],
        },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.ts$/, exclude: /node_modules/, use: ["ts-loader"] },
      ],
    },
    output: {
      path: path.join(__dirname, "public"),
      filename: "app.js",
    },
    ...overrides,
  };
};
