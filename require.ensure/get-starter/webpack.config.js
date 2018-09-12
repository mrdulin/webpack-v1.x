const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].[hash].js'
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'ensure',
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
