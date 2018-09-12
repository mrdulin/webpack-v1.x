const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].[hash].js',
		pathinfo: true
	},

	module: {
		loaders: [
			{
				test: /\.(png|jpg)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
				query: {
					limit: 100000
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'context',
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(['dist', 'build'])
	]
};

module.exports = config;
