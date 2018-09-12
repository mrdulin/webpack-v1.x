const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeModulePath = path.join(__dirname, '../node_modules');

module.exports = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'react-router'
		]
	},
	resolve: {
        root: __dirname,
        modulesDirectories: ["node_modules"],
		alias: {}
    },
	output: {
		path: path.join(__dirname, 'dll'),
		filename: '[name]-[hash:8].js',
		library: '[name]'
	},
	plugins: [
		new cleanWebpackPlugin('dll', {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dll', '[name]-manifest.json'),
			name: '[name]',
			context: __dirname
		}),
		new AssetsPlugin({
			filename: 'assets.json',
        	path: path.join(__dirname, 'dll')
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		//貌似无用
		new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};

