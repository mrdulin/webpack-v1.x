var webpack = require('webpack');
var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
	context: process.cwd(),
	entry: {
        app: src + '/index.js',
        vendor: ['zepto']
    },
	output: {
		path: dist,
		filename: '[name].js?[hash:8]'
	},
    resolve: {
        alias: {
            // zepto: path.join(__dirname, '../node_modules/zepto/dist/zepto.min')
        },
        noParse: [/\.zepto.min/]
    },
	module: {
		loaders: [
            {
                test: require.resolve('zepto'),
                loader: 'script'
            }
		]
	},
	plugins: [
        new cleanWebpackPlugin('dist'),
        new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js?[hash:8]', Infinity),
		new htmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'zepto'
        })
	]
}
