const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	plugins: [
		new htmlWebpackPlugin({
			template: 'src/index.html',
			title: 'webpack command line tool test'
		})
	]
};

module.exports = config;
