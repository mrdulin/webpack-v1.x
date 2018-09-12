const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const autoconfig = require('./src/autoconfig');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};


const config = {
	context: process.cwd(),
	entry: {
		app: paths.src + '/index'
	},

	output: {
		path: paths.dist,
		filename: '[name].bundle.js'
	},

	plugins: [
		new cleanWebpackPlugin(paths.dist, {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new htmlWebpackPlugin({
			title: '广告模块走autoconfig模块载入测试，添加线上脚本',
			template: './index.html',
			script: {
				ad: '<script defer src="' + autoconfig.AD_MODULE + '"></script>'
			}
		})
	]
}

module.exports = config;
