const webpack = require('webpack');

//注意：webpack的plugin，一般require的都是构造函数，所以按约定，构造函数的首字母要大写
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: {
    app: './src/index.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: './dist',
    filename: '[name].[hash:8].js',
    pathinfo: true
  },

  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    colors: true,
    port: 3000,
    progress: true,
    stats: 'errors-only'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(['dist', 'build']),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash:8].js', Infinity)
  ]
};

module.exports = config;
