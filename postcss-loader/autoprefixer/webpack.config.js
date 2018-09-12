const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const autoprefixer = require('autoprefixer');

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
                loader: ExtractTextPlugin.extract('style', 'css?!postcss!sass'),
                include: [
                    path.join(__dirname, 'src')
                ]
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({ add: false, browsers: [] }),
            autoprefixer()
            // autoprefixer({
            //     browsers: [
            //         "> 1%",
            //         "Last 5 versions"
            //     ]
            // })
        ];
    },
	plugins: [
        new ExtractTextPlugin('[name].[contenthash:16].css'),
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		new cleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
}

module.exports = config;
