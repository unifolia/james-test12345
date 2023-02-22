const path = require('path');
const devOptions = require('./dev-options');
const Logger = require('node-color-logger');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const logger = new Logger('white');

// Loader Rules - Babel Loader
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.25%, not op_mini all',
        },
      ],
    ],
  },
};

// Loader Rules - JS
const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [babelLoader],
};

// Loader Rules - eslint
const eslint = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
};

// Loader Rules - HTML
const html = {
  test: /\.html$/,
  use: [
    babelLoader,
    {
      loader: 'html-es6-template-loader',
      options: {},
    },
    {
      loader: 'extract-loader',
      options: {},
    },
    {
      loader: 'html-loader?interpolate=require',
      options: {
        minimize: true,
        removeAttributeQuotes: false,
      },
    },
  ],
};

// Loader Rules - Fonts
const fonts = {
  test: /\.(eot|ttf|woff|woff2)$/i,
  loader: 'file-loader',
  options: {
    name: 'assets/fonts/[name].[ext]',
  },
};

// Loader Rules - Imgs
const images = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    name: 'assets/images/[name].[ext]',
  },
};

module.exports = {
  entry: {
    'en/en': './entry-points/en.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [javascript, eslint, html, images, fonts],
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'MarkBot',
      suppressWarning: true,
      suppressSuccess: !devOptions.notifyOnBuildSuccess ? 'always' : false,
      messageFormatter(obj, string) {
        logger.changeColorTo('white').log(obj, string);
        return `Hey Onbrander! Wepack hit an error in ${string}. Check the terminal for details!`;
      },
    }),
  ],
};
