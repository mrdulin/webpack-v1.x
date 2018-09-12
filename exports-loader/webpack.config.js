var webpack = require('webpack');
var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	context: process.cwd(),
	entry: src + '/index.js',
	output: {
		path: dist,
		filename: 'bundle.js?[hash:8]'
	},
	module: {
		loaders: [
            {
                test: require.resolve('./src/modules/nova'),
                //nova,getBody，逗号左右两边不要有空格
                //如果是这样nova, getBody，则require('./modules/nova')得到的对象的key是" getBody"和"nova"
                
                // loader: 'exports?nova, getBody=helpers.getBody',
                loader: 'exports?nova,getBody=helpers.getBody,getUA=helpers.getUserAgent'
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.$!script'
            }
		]
	},
	plugins: [
		new htmlWebpackPlugin()
	]
}
