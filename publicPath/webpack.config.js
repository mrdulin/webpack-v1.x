const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].js',
		publicPath: 'http://7xp9vw.com1.z0.glb.clouddn.com/'
	},

	module: {
		loaders: [
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader',
				query: {
					name: '[path][name].[ext]',
					context: './src'
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},

	plugins: [
		new htmlWebpackPlugin({
			title: 'publicPath test',
			hash: true,
			template: './src/index.html'
		})
	]
};

module.exports = config;
