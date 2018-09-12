const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom']
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

  plugins: [
    /**
     * EnvironmentPlugin插件内部使用了webpack.DefinePlugin，作用与DefinePlugin类似
     * 提供一种对环境变量的引用, 不过，EnvironmentPlugin只能对process.env上设置的变量引用
     * 详见EnvironmentPlugin源码
     * http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
     */
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),

    /**
     * https://github.com/webpack/webpack/issues/4390#event-979477993
     * webpack2 支持传递对象作为参数
     * 对象的key是环境变量，value是默认值
     */
    // new webpack.EnvironmentPlugin({
    //     "NODE_ENV": 'development'
    // }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new cleanWebpackPlugin(['dist', 'build']),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash:8].js', Infinity)
  ]
}

module.exports = config;
