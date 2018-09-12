import webpack from 'webpack';
import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

export default {
	entry: src + '/index.js',
	output: {
		path: dist,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel'
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'file',
			query: {
				name: '[path][name].[ext]',
				context: './src'
			}
		}]
	},
	plugins: [
		new htmlWebpackPlugin()
	]
}

//使用../node_modules/.bin/webpack，可以运行es6的webpack配置文件
