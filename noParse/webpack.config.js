const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const util = require('util');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

const getNodeModulePath = (modulePath) => path.join(__dirname, '../node_modules', modulePath)

const config = {
	addNoParse: (noParseMap) => {
		if (noParseMap.keys().length === 0) return;
		for (let [name, path] of noParseMap.entries()) {
			config.resolve.alias[name] = path;
			config.module.noParse.push(path);
		}
	},

	entry: {
		app: paths.src + '/app.js',
	},

	output: {
		path: paths.dist,
		filename: '[name].[hash].js'
	},

	devtool: 'source-map',

	resolve: {
		alias: {
			'react-dom': getNodeModulePath('/react-dom/dist/react-dom.min.js'),
			'react': getNodeModulePath('/react/dist/react.min.js')
		}
	},

	module: {
		noParse: [],

		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(js|jsx)$/,
			include: paths.src,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},

	plugins: [
		new cleanWebpackPlugin(paths.dist, {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		//noParse可以喝ProvidePlugin一起使用
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		}),
		new htmlWebpackPlugin({
			template: paths.src + '/index.html',
			filename: 'index.html'
		})
	]
}

const noParseMap = new Map([
	['purecss', getNodeModulePath('purecss/build/pure-min.css')],
	['util', paths.src + '/util.js'],
	['react', getNodeModulePath('/react/dist/react.min.js')]
]);

config.addNoParse(noParseMap);

module.exports = config;
