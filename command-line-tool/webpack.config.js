const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        app: path.resolve('src', 'app'),
    },
    output: {
        path: './dist',
        filename: '[name].[hash].js',
    },
	plugins: [
		new htmlWebpackPlugin({
			template: 'src/index.html',
			title: 'webpack command line tool test'
		})
	]
};

module.exports = config;
