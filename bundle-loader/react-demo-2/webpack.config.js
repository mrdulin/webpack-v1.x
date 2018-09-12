const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'app.[hash].js',
    chunkFilename: 'chunks/[id].[name].js',
    pathinfo: true
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      //通过link加载每个chunk模块的样式
      //<link rel="stylesheet" type="text/css" href="style.6e1bc6fe.css">
      // {
      // 	test: /\.css$/,
      // 	exclude: /node_modules/,
      // 	loader: 'style/url!file?name=[name].[hash:8].[ext]',
      // }

      //配合ExtractTextPlugin的allChunks: true参数
      //将所有chunk中require的css在webpack编译的优化阶段抽取出来，合并成一个css文件
      //模块按需加载，但这个css文件初次就加载了
      // {
      // 	test: /\.css$/,
      // 	exclude: /node_modules/,
      // 	loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      // }

      //这种方式可以实现css跟着每一个require.ensure的分离点打包出来的chunk的按需加载，但页面会出现闪烁（闪出样式渲染前的样式）。
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style/url', 'file?name=css/[name].[hash:8].[ext]!extract', 'css?sourceMap']
      }
    ]
  },

  resolve: {
    alias: {}
  },

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    colors: true,
    port: 3000,
    progress: true
  },

  plugins: [
    //allChunks的含义：
    //extract from all additional chunks too (by default it extracts only from the initial chunk(s))
    //默认是false, 表示只从初始化的chunk文件中抽取css文件，本例就是从index.js抽取index.css文件。
    new ExtractTextPlugin('[id].[name].[contenthash:8].css', {
      allChunks: false
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new htmlWebpackPlugin({
      title: 'React code split with bundle loader',
      template: './src/index.html'
    }),
    new cleanWebpackPlugin(['dist', 'build'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
}

module.exports = config;
