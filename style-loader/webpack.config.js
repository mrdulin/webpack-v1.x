const htmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');


console.log(path.join(__dirname, '/src/input.css'));

module.exports = {
  entry: './src',
  output: {
    path: 'dist',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [
      //默认地，style-loader会在head标签底部添加style标签，加insertAt=top参数，会将style标签添加在head标签顶部
      //样式文件名带useable的，可以通过use/unuse方法来控制是否在head标签中插入该css
      //exclude和include只支持1.绝对路径，2.正则表达式
      //排除样式文件名包含useable的文件，reset.css和style.css将插入到head顶部
      {
        test: /\.css$/,
        exclude: [
          /\.useable\.css$/,
          path.join(__dirname, '/src/input.css'),
          path.join(__dirname, '/src/test.useable.css')
        ],
        loader: 'style-loader?insertAt=top!css-loader'
      },

      //如果文件名包含useable，开启Reference-counted API
      { test: /\.useable\.css$/, loader: "style-loader/useable!css-loader" },

      //include，只针对input.css，生成<link rel="stylesheet" href=""/>插入input.css
      //默认地link标签中引入的样式文件名是file-loader自动生成的32位hash，但可以通过file-loader的参数来指定文件名
      //多个loader组合，无法使用query对象来配置loader参数，有两种解决方案：1.使用查询字符串，2.JSON.stringify(queryObject)
      //Most loaders accept parameters in the normal query format (?key=value&key2=value2) and as JSON object (?{"key":"value","key2":"value2"}).
      {
        test: /\.css$/,
        include: [path.join(__dirname, '/src/input.css')],
        loader: 'style-loader/url!file-loader?name=[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
