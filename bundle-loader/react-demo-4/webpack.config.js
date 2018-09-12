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

const config = {
	entry: {
        app: './src/index.js',
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
    },
	output: {
		path: './dist',
		filename: 'app.[chunkhash].js',
		chunkFilename: 'chunks/[id].[name].[chunkhash:8].js',
		pathinfo: true
	},

	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'],
                    plugins: [
                        ['transform-runtime', {
                            "helpers": false, // defaults to true
                            "polyfill": false, // defaults to true
                            "regenerator": false, // defaults to true
                            "moduleName": "babel-runtime" // defaults to "babel-runtime"
                        }]
                    ],
                    babelrc: false
				}
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
		alias: alias
	},

	devServer: {
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true
	},

	plugins: [
        new BellOnBundlerErrorPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[chunkhash:16].js", Infinity),
		new ExtractTextPlugin('app.[contenthash:16].css', {
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
