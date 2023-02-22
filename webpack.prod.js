const common = require('./webpack.common');
const devOptions = require('./dev-options');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const styles = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: `https://cihost.uberflip.com/${devOptions.cihostFolder}/${process.env.CI_BRANCH}/build/`,
  },
  module: {
    rules: [styles],
  },
  plugins: [
    new webpack.DefinePlugin({
      production: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
