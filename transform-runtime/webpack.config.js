const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

// console.log(path.resolve(__dirname, '../node_modules/react-tap-event-plugin/src/SyntheticEvent.js'));

module.exports = {
  entry: {
    app: src + '/index.js',
    vendor: [
      // 'react-tap-event-plugin'
    ]
  },
  output: {
    path: dist,
    filename: '[name].js',
    chunkFilename: '[id].[name].js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          src,
          path.resolve(__dirname, '../node_modules/react-tap-event-plugin/src/SyntheticEvent.js')
        ],
        // exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(dist),
    //抽取a,b,c三个分离点chunk中公用的模块，本例抽取的是`babel-runtime/xx`和`core-js`公用模块，
    //例如 ../~/core-js/library/modules/es6.object.define-property.js
    //参考例子：https://github.com/webpack/webpack/tree/master/examples/extra-async-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: true,
    //   // children: true,
    //   filename: 'common.js',
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new htmlWebpackPlugin()
  ]
}
