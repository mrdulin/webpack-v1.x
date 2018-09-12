var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin  = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin')

const cssLoaderQuery = {
    camelCase: true,
	module: true,

	//css module开启sourceMap后，在css文件中使用background: url(path/xx.jpg)，通过url-loader处理，webpack编译不报错，但是加载不出来背景图片
	//不过base:64形式的DataUrl可以正常工作

	// sourceMap: true,
	localIdentName: '[local]--[hash:base64:5]'
}

module.exports =  {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: './dist',
		filename: '[name].[hash].js',
		pathinfo: true
    // css-module开启后，无法显示background-image的问题，正确姿势是设置publicPath
},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		colors: true,
		port: 3000,
		progress: true,
		stats: 'errors-only'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss', '.sass', '.css', '.json'],
		alias: {
			common: path.join(__dirname, './src/common')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-0'],
                    babelrc: false
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				loader: 'url',
				query: {
					limit: 8192,
					name: 'images/[name]-[hash:8].[ext]'
				}
			},
			{
				test: /\.css$/,
				exclude: [/node_modules/, /\.module\.css$/],
				loader:  ExtractTextPlugin.extract('style', 'css?sourceMap')
			},
			{
                test: /\.module\.css$/,
                include: [/\.module\.css$/],
                loaders: ['style', `css?${JSON.stringify(cssLoaderQuery)}!postcss`]
            },
            {
                test: /\.module\.scss$/,
                include: [/\.module\.scss$/],
                loaders: ['style', `css?${JSON.stringify(cssLoaderQuery)}!postcss!sass`]
            }, {
                test: /\.scss$/,
                exclude: [/(node_modules)/, /\.module\.scss$/],
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            }
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist'),
		new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: true
        }),
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			ReactRouter: 'react-router'
		})
	]
}
