const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')

const nodeModulePath = path.join(__dirname, '../../node_modules');

const alias = {
	react: 'react/dist/react.min.js',
	'react-dom': 'react-dom/dist/react-dom.min.js',
	'react-router': 'react-router/umd/ReactRouter.min.js'
}

Object.keys(alias).forEach(function(name) {
  	alias[name] = path.resolve(path.join(__dirname, '../../node_modules', alias[name]));
});

const noParse = ['react'].map(name => alias[name]);

const babelLoaderQuery = {
    presets: ['es2015', 'react']
}

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
				query: babelLoaderQuery
			},
            {
                test: /index.js/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src', 'modules'),
                loaders: ['bundle?lazy', 'babel?' + JSON.stringify(babelLoaderQuery)]
            },
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			}
		],
		noParse: noParse
	},

	resolve: {
        alias: Object.assign({
            modules: path.resolve(__dirname, 'src/modules')
        }, alias)
	},

	devServer: {
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true
	},

	plugins: [
		new ExtractTextPlugin('app.[contenthash].css', {
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			ReactRouter: 'react-router'
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
