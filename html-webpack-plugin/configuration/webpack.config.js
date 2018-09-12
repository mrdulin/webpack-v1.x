const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

const config = {
	context: process.cwd(),
	entry: {
		app: paths.src + '/app.js'
	},

	output: {
		path: paths.dist,
		filename: '[name].js'
	},

	plugins: [
		new htmlWebpackPlugin({
			//生成的html文件的title
			title: 'htmlWebpackPlugin Configuration Introduction',
			//生成的html文件名，默认是'index.html'
			filename: 'index.html',
			//指定生成html的模版
			template: paths.src + '/index.html',
			//指定bundle文件的在生成的html中的注入位置。
			//声明true和'body'，bundle文件将注入在html文件中的body结束标签前.
			//声明'head'，bundle文件将注入在html文件中的head标签内
			//声明false，bundle文件不会注入
			inject: true,
			//指定favicon，会添加favicon的link标签到生成的html文件中
			favicon: paths.src + '/favicon.png',
			//压缩生成的html
			//false，不压缩,
			//options object 根据压缩规则压缩
			minify: false,
			//给每个webpack编译后的在生成的html中引入的js和css文件文件名后添加一个hash值，解决文件缓存问题
			hash: true,
			//在生成的html中添加指定的chunk，如下例，将添加app
			// chunks: ['app'],
			// 在生成的html中排除指定的chunk
			// excludeChunks: [],
			cache: true,
			showErrors: true
		})
	]
}

module.exports = config;
