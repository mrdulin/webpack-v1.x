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
		filename: 'bundles/[name].bundle.[chunkhash:8].js',
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
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true
	},

	plugins: [
        //如果不加CommonsChunkPlugin，则webpack会把应用程序和应用程序使用的react,react-dom等库都打包到一个app.bundle.js中
        //vendor这个入口文件，则会打包其后面数组中指定的库到vendor.bundle.js中，很明显，app.bundle.js和vendor.bundle.js中都有
        //了react,react-dom等这些第三方库文件

        //要是能把app.bundle.js中的库文件抽出来打包到vendor.bundle.js文件中就好了，使用CommonsChunkPlugin
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'bundles/vendor.js',
            minChunks: Infinity
        }),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
            ReactRouter: 'react-router'
		}),
		new htmlWebpackPlugin({
			title: 'React commons chunk plugin',
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
