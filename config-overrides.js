const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const processPolyfill = require.resolve('process/browser');

module.exports = override(
  addWebpackAlias({
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util")
  }),
  addWebpackPlugin(new webpack.ProvidePlugin({ process: processPolyfill }))
);
