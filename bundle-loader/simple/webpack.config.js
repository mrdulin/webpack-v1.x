const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].[hash].js',

		//chunkFilename可以指定路径，如下例，最后编译生成后的目录结构是dist/chunks/1.1.chunk. ...
		chunkFilename: 'chunks/[id].[name].js',
		pathinfo: true
	},

	plugins: [
		new htmlWebpackPlugin({
			title: 'code split with bundle loader',
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
