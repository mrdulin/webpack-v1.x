const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');

const nodeModulePath = path.join(__dirname, '../node_modules');

const alias = {
	react: 'react/dist/react.min.js',
	'react-dom': 'react-dom/dist/react-dom.min.js',
	'react-router': 'react-router/umd/ReactRouter.min.js'
}

Object.keys(alias).forEach(function(name) {
  	alias[name] = path.resolve(path.join(__dirname, '../node_modules', alias[name]));
});

const noParse = ['react'].map(name => alias[name]);

const config = {
	entry: {
		app: './app',
		vendor: [
			'react',
			'react-dom',
            'react-router'
		],
		'home-common': [
			'common/js/components/A',
			'common/js/components/B'
		],
		common: [
			'common/js/components/C',
			'common/js/components/D',
			'common/js/components/E'
		]
	},

    output: {
		path: './dist',
		filename: 'bundles/[name].js?[chunkhash:8]',
		chunkFilename: 'modules/[id].[name].chunk.js?[chunkhash:8]',
        pathinfo: true
	},

	resolve: {
		alias: Object.assign({
			root: process.cwd(),
			app: path.join(__dirname, 'app'),
			common: path.join(__dirname, 'app/common')
		}, alias),
		noParse: noParse
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
			},
			{
                test: /\.css$/,
                exclude: [/node_modules/, /\.module\.css$/],
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json'
			}
		]
	},

	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		port: 3000,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		host: '0.0.0.0'
	},	

	plugins: [
		
		new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true
        }),
		 new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            ReactRouter: 'react-router'
        }),
        new cleanWebpackPlugin('dist'),
		new webpack.optimize.CommonsChunkPlugin({
			//names数组中顺序很重要
			names: ['common', 'home-common', 'vendor'],
			//对比下面的顺序打包出来的文件包含的内容是不一样的
			// names: [''vendor', common', 'home-common'],
			filename: '[name].js?[hash:8]',
			minChunks: Infinity
		}),
		// new webpack.optimize.CommonsChunkPlugin("vendor", "[name].js?[hash:8]", Infinity),
		new htmlWebpackPlugin({
			template: './app/index.html',
			chunks: ['vendor', 'app', 'home-common'],
			script: require('./webpack-assets.json').common.js
		})
	].concat(
		require('./webpack-assets.json').common.js ? 
		[] : 
		new AssetsPlugin({
			prettyPrint: true
		})
	)
};

module.exports = config;
