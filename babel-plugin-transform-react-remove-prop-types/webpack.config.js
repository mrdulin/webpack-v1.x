const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: {
		app: './src/main.js',
		vendor: [
			'react'
		]
	},
	output: {
		path: './dist',
		filename: '[name].[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new htmlWebpackPlugin({
			title: 'react remove prop types',
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
