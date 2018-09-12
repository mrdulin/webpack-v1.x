var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports =  {
	entry: {
		app: src + '/index.js'
	},
	output: {
		path: dist,
		filename: '[name].[hash].js',
		pathinfo: true
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
				query: {
					limit: 40000,
					//aaaaa
					// name: '[path][name].[ext]?[hash]',
					//common
					name: 'images/[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
        //大型项目中，依赖的库很多，例如react,react-router,react-dom,redux,react-redux等等
        //通过指定这些库的alias，可以提高webpack模块解析速度，从而提高打包编译的速度
		alias: {
			aaaaa: path.join(__dirname, './src/aaaaa'),
			common: path.join(__dirname, './common')
		}
	},
	plugins: [
		new CleanWebpackPlugin(dist),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};
