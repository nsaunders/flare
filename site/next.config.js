const withMDX = require("@next/mdx");
const {
  getGlobalCssLoader,
} = require("next/dist/build/webpack/config/blocks/css/loaders");
const {
  default: MiniCssExtractPlugin,
} = require("next/dist/build/webpack/plugins/mini-css-extract-plugin");

function withDemitasse(nextConfig = {}) {
  return {
    webpack(config, options) {
      const { dev, isServer } = options;

      config.module.rules.push({
        test: /\/extracted-styles\.js$/,
        sideEffects: true,
         use: dev
          ? getGlobalCssLoader(
              {
                assetPrefix: options.config.assetPrefix,
                future: {
                  webpack5: true,
                },
                isClient: !isServer,
                isServer,
                isDevelopment: dev,
              },
              [],
              []
            )
          : [MiniCssExtractPlugin.loader, 'css-loader'],
      });

      config.module.rules.push({
        test: /\/extracted-styles\.js$/,
        use: ["postcss-loader", "val-loader"],
      });

      const plugins = [];

      if (!dev) {
        plugins.push(
          new MiniCssExtractPlugin({
            filename: "static/css/[contenthash].css",
            chunkFilename: "static/css/[contenthash].css",
            ignoreOrder: true,
          })
        );
      }

      config.plugins.push(...plugins);

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}

module.exports = withDemitasse(withMDX({ extension: /\.mdx?$/ })({
  webpack: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /flare(\-core)?\/docs\/README\.md$/,
          use: [
            {
              loader: "string-replace-loader",
              options: {
                search: "README.md",
                replace: "",
              },
            },
          ],
        },
      ],
    },
  }),
}));
