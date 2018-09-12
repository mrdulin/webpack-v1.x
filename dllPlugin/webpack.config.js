const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const config = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'app.[hash:8].js',
		chunkFilename: 'chunks/[id].[name].js',
		pathinfo: true
	},

	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},

	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true
	},

	resolve: {
        extensions: ["", ".js", ".jsx"],
        root: __dirname,
        modulesDirectories: ["node_modules"]
    },

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
            ReactRouter: 'react-router'
		}),
		new htmlWebpackPlugin({
			title: 'webpack dll',
			template: './src/index.html',
			dll: require(path.join(__dirname, './dll/assets.json')).vendor.js
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(path.join(__dirname, './dll/vendor-manifest.json'))
		}),
		new CopyWebpackPlugin([
			{ from: `dll/${require(path.join(__dirname, 'dll/assets.json')).vendor.js}`, to: '' }
		]),
		new cleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
}

module.exports = config;
