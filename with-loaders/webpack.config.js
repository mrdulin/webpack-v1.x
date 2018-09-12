const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	entry: src + '/main.js',
	output: {
		path: dist,
		filename: "[name].[hash].js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			exclude: /(node_modules|bower_components)/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.coffee$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'coffee-loader'
		}, {
			test: /\.(png|jpg)$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'url-loader?limit=819200'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.json', '.coffee']
	},
	plugins: [
		new cleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new htmlWebpackPlugin({
			title: 'webpack with some loaders',
			template: src + '/index.html'
		})
	]
};
