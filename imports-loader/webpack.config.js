const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: '[name].[hash].js',
        pathinfo: true
    },
	module: {
		loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
			{
                //es5模块设置this=>window报错
                test: require.resolve('chosen-js/chosen.jquery'),
                loader: 'imports-loader?jQuery=jquery, $=jquery'
			},
            {
                test: require.resolve('./src/es6-this'),
                loader: 'imports-loader?this=>window'
            }
		]
	},
	plugins: [
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
