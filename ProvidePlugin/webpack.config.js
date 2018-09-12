const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

const paths = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  entry: {
    app: paths.src + "/app.js"
  },

  output: {
    path: paths.dist,
    filename: "[name].[hash].js",
    pathinfo: true
  },

  plugins: [
    new cleanWebpackPlugin(paths.dist, {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new htmlWebpackPlugin({
      template: paths.src + "/index.html",
      filename: "index.html"
    }),

    new webpack.ProvidePlugin({
      //使用`underscore`库来演示，在浏览器控制台中查看
      //通过`ProvidePlugin`指定的库，每次在模块中使用`ProvidePlugin`中定义的变量时(本例中为`_`)，`webpack`会帮你自动`require('underscore')`
      _: "underscore",
      //错误的思路1：认为webpack打包时不会引入ProvidePlugin配置的文件，所以觉得在该文件中拿不到浏览器环境的window对象。
      //错误的思路2：认为webpack打包时会将所有使用autoconfig的地方的变量替换成真实的值
      //正确的思路：webpack打包会引入这里配置的文件，并且不会替换，而是在程序运行时去计算变量的值。
      autoconfig: paths.src + "/switchAutoconfig",

      //测试：同时暴露Util和c模块，c模块和util模块互相依赖，测试不通过。
      Util: paths.src + "/util",
      c: paths.src + "/c"
    })
  ]
};
