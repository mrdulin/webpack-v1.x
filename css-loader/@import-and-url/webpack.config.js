var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin  = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin')

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports =  {
	entry: {
		app: src + '/index.js'
	},
	output: {
		path: dist,
		filename: '[name].[hash].js',
		pathinfo: true
	},
	devtool: 'source-map',
    debug: true,
    resolve: {
        alias: {
            public: path.join(__dirname, 'public')
        }
    },
	module: {
		loaders: [
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.(jpg|png)$/,
                exclude: /node_modules/,
                loader: 'url',
                query: {
                    name: 'images/[name].[hash:8].[ext]'
                }
            }
		]
	},
	plugins: [
		new CleanWebpackPlugin(dist),
		new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true
        }),
		new htmlWebpackPlugin({
			template: './src/index.html'
		})
	]
}
