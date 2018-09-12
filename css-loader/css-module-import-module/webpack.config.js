var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

const cssLoaderQuery = {
  camelCase: true,
  module: true,
  sourceMap: true,
  localIdentName: '[local]--[hash:base64:5]'
};

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].[hash:8].js',
    pathinfo: true
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      common: path.join(__dirname, 'src/common')
    }
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.module\.(scss|css)$/,
        include: /\.module\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', `css?${JSON.stringify(cssLoaderQuery)}!sass?sourceMap`)
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /\.module\.(scss|css)$/],
        loader: ExtractTextPlugin.extract('style', `css?sourceMap!sass?sourceMap`)
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin('[name].[contenthash:8].css', {
      allChunks: true
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
