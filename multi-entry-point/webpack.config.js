var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	entry: {
		bundle1: src + '/a.js',
		bundle2: [
			src + '/b.js',
			src + '/c.js'
		]
	},
	output: {
		path: dist,
		// filename: '[name].[hash].js'
		filename: '[name].[chunkhash].js'
	},
	module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
	plugins: [
		new CleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new htmlWebpackPlugin({
			title: '打包生成多个bundle文件'
		}),
		new ExtractTextPlugin('[name].[chunkhash].css')
		// new ExtractTextPlugin('[name].[contenthash].css')
	]
};

