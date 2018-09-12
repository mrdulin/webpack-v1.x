const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const config = {
	entry: './src/index',
	output: {
		path: './dist',
		filename: '[name].[chunkhash:16].js'
	},
    module: {
        loaders: [
            {
                test: /\.scss|sass$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
                include: [
                    path.join(__dirname, 'src')
                ]
            }
        ]
    },
    postcss: function() {
        return [
            require('postcss-pxtorem')({
                propList: ['*']
            })
        ];
    },
	plugins: [
        new ExtractTextPlugin('[name].[contenthash:16].css'),
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		new cleanWebpackPlugin(['dist', 'build'])
	]
}

module.exports = config;
