const webpack = require('webpack');


module.exports = {
	entry: {
		p1: './src/page1',
		p2: './src/page2',
		p3: './src/page3'
	},

	output: {
		filename: '[name].bundle.js',
		path: './dist'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.bundle.js')
	]
}
