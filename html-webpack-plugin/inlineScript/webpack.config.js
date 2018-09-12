const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};


const config = {
	context: process.cwd(),
	entry: {
		app: paths.src + '/index',
		inject: paths.src + '/injectScriptModule',
		asshole: paths.src + '/asshole'
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
			title: '在html中添加内联脚本',
			template: './index.html',
			//问题1：但下面的操作是在webpack配置阶段执行的，所以文件是没有被编译过的
			//问题2：当修改此内联脚本时，需要重新运行webpack打包编译流程
			inline: fs.readFileSync(paths.src + '/inlineScript.js', 'utf8'),

			files: {
				js: ['inject.bundle.js', 'asshole.bundle.js']
			},
			excludeChunks: ['inject', 'asshole']
		})
	]
}

module.exports = config;
