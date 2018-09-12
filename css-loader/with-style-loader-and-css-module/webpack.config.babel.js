var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin')

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

//开启css的sourceMap需要webpack配置devtool，css-loader的query参数也要开启sourceMap
const cssLoaderQuery = {
  module: true,
  localIdentName: '[name]--[local]--[hash:base64:5]',
  sourceMap: true
}

module.exports = {
  entry: {
    app: src + '/index.js'
  },
  output: {
    path: dist,
    filename: '[name].[hash].js',
    pathinfo: true
  },
  devtool: 'source-map',
  module: {
    loaders: [
      //css module和普通css共存
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.module\.css$/],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.module.css$/,
        include: [
          /\.module\.css$/
        ],
        //localIdentName的[name]是文件名，例如button.css，name就是button
        loaders: ['style', `css?${JSON.stringify(cssLoaderQuery)}`],
        // exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(dist, {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
