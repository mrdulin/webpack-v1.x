const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const config = {
	entry: {
		p1: './src/page1.js',
		p2: './src/page2.js',
		p3: './src/page3.js',
		ap1: './src/admin-page1.js',
		ap2: './src/admin-page2.js'
	},

	output: {
		path: './dist',
		filename: '[name].bundle.js'
	},

	plugins: [
		new CommonsChunkPlugin('admin-commons.js', ['ap1', 'ap2']),
		new CommonsChunkPlugin('commons.js', ['p1', 'p2', 'admin-commons.js'])
	]
};

module.exports = config;


