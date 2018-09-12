const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: 'bundles/[name].bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.(png|jpg)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'file-loader',
				query: {
					//1.
					//如果不指定context，图片文件夹最终生成的路劲是dist/src/images
					// name: '[path][name].[ext]?[hash:8]',
					//如果指定context如下：最终生成的路径是dist/images
					// context: './src'

					//2.
					//生成的目录结构和1一样
					name: 'images/[name].[ext]?[hash:8]'


				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextWebpackPlugin.extract('style', 'css?sourceMap')
			}
		]
	},

	plugins: [
		new ExtractTextWebpackPlugin('bundles/style.[contenthash:8].css'),
		new htmlWebpackPlugin({
			template: './src/index.html',
			title: 'file-loader'
			// hash: true
		}),
		new cleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
}

module.exports = config;
