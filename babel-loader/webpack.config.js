const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	entry: src + '/index.js',
	output: {
		path: dist,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					compact: 'auto'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(dist, {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new htmlWebpackPlugin()
	]
}
