var webpack = require('webpack');
var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	//上下文，以上下文的目录作为查找entry字段的查找根目录
	context: process.cwd(),
	entry: src + '/entry.js',
	output: {
		path: dist,
		// filename: 'bundle.[hash:8].js'
		filename: 'bundle.js?[hash:8]'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	},
	plugins: [
		new htmlWebpackPlugin()
	]
}
