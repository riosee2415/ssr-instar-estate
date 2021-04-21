const path = require("path");
const { withPlugins } = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withGraphql = require("next-plugin-graphql");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
        "fs-extra": "empty",
      };
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        isDevelopment ? "isomorphic-style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            esModule: true,
            modules: {
              auto: true,
              localIdentName: "[name]_[local]--[hash:base64:5]",
            },
          },
        },
        "postcss-loader",
        "sass-loader",
      ],
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssModules: false,
        url: false,
      },
    ],
    [withFonts],
    [withImages],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]",
        },
        sassLoaderOptions: {
          includePaths: [path.resolve(__dirname, "./@"), "node_modules"],
        },
      },
    ],
    [withGraphql],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
          },
        },
      },
    ],
  ],
  nextConfig
);
