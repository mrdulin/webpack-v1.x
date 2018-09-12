const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    app: [
      //开启websocket连接
      'webpack-dev-server/client?http://localhost:8080/',
      //在浏览器中运行HMR
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel',
        query: {
          presets: ["es2015", "react"],
          cacheDirectory: true
        }
      }
    ]
  },

  resolve: {
    root: [
      path.resolve('../../node_modules')
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './src'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new htmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
}

module.exports = config;
