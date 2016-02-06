var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var DEBUG = true;
var assetsPluginOpts = {
  path: __dirname,
  filename: 'assets.json',
  prettyPrint: true
};

module.exports = {
  entry: './src/browser/main.js',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name]-[hash].js',
    sourceMapFilename: '[file].map',
    sourcePrefix: "",
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass?config=sassFileConfig')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {presets: ['node5', 'react', 'es2015']},
        plugins: ['transform-runtime']
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 3 versions']})],
  sassFileConfig: {
    indentedSyntax: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new AssetsPlugin(assetsPluginOpts)
  ],
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#source-map' : false,
  stats: {
    colors: true,
    reasons: DEBUG
  }
};
