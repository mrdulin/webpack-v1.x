const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src/include')
				],
				exclude: [
					path.resolve(__dirname, 'src/exclude')
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},

	plugins: [
		new htmlWebpackPlugin({
			title: 'loader include test',
			hash: true
		})
	]
};

module.exports = config;
