const { join } = require('../../util');
const { plugins } = require('../../webpack.config.base');

let config = {
  entry: {
    app: join('app')
  },
  output: {
    filename: 'bundles/[name].[hash:8].js',
    path: join('dist'),
    chunkFilename: 'modules/[id].[name].[hash:8].js',
    pathinfo: true,
    publicPath: '/'
  },
  /**
   * 使用webpack-dev-server的时候，修改文件保存文件时发现hot reload无效
   * https://github.com/webpack/webpack-dev-server/issues/324
   * 这个issue貌似不是我的情况，然后灵光一闪，发现例子的文件夹名是`using-import()`
   * 开始怀疑是文件夹名称的问题，改成`using-import`，果然正常了。
   * cd using-import() 时，terminal会对括号加转义，变成cd using-import\(\)/
   * 不知道是不是这个问题影响到了webpack路径解析，提个issue看看。
   * TODO: github issue地址
   *
   */
  devServer: {
    historyApiFallback: true,
    contentBase: '.',
    port: 3000,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
              plugins: ['syntax-dynamic-import']
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};

module.exports = config;
