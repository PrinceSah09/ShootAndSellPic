// next.config.js
const webpack = require("webpack");

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve("process/browser"),
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      })
    );

    return config;
  },
};
