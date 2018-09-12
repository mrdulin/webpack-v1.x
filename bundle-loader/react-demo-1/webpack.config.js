const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

var nodeModulePath = path.join(__dirname, '../../node_modules');

const alias = {
	react: 'react/dist/react.min.js',
	'react-dom': 'react-dom/dist/react-dom.min.js',
	'react-router': 'react-router/umd/ReactRouter.min.js'
}

Object.keys(alias).forEach(function(name) {
  	alias[name] = path.resolve(path.join(__dirname, '../../node_modules', alias[name]));
});


const noParse = ['react'].map(name => alias[name]);


const config = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'app.[hash].js',
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
		],
		noParse: noParse
	},

	resolve: {
		alias: alias
	},

	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		}),
		new htmlWebpackPlugin({
			title: 'React code split with bundle loader',
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
