const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		app: './src/app.js',
		vendor: [
			'react',
			'react-dom'
		]
	},

	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react']
				}
			}
		]
	},

	output: {
		path: './dist',
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new htmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};

module.exports = config;
