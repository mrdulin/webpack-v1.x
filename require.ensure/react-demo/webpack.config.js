const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

var nodeModulePath = path.join(__dirname, '../../node_modules');

const alias = {
    react: 'react/dist/react.min.js',
    'react-dom': 'react-dom/dist/react-dom.min.js',
    'react-router': 'react-router/umd/ReactRouter.min.js'
}

Object.keys(alias).forEach(function (name) {
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
        ],
        //提取common资源到common.js，解决了相同资源重复打包的问题，但是会导致首次加载的js文件数量和大小增加
		common: [
            //将src/modules下每个模块使用src/common中的模块和资源，打包时提取成一个公共文件
			'./src/common/js/components',
            './src/common/js/util',

            //src/modules下的模块使用src/common/images的某个图片资源的时候，最后打包会把这个图片资源(base:64的dataUrl)打包到每一个chunk文件中
            './src/common/images'
		]
    },
    output: {
        path: './dist',
        filename: 'app.[hash:8].js',
        chunkFilename: 'chunks/[id].[name].js',
        pathinfo: true
    },

    module: {
        loaders: [{
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        ["transform-runtime", {
                            "helpers": false, // defaults to true
                            "polyfill": false, // defaults to true
                            "regenerator": false, // defaults to true
                            "moduleName": "babel-runtime" // defaults to "babel-runtime"
                        }]
                    ],
                    babelrc: false,
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /\.module\.css$/],
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.(jpg|png)$/,
                include: path.join(__dirname, 'src'),
                loader: 'url',
                query: {
                    limit: 8192,
					name: 'images/[name]-[hash:8].[ext]'
                }
            }
        ],
        noParse: noParse
    },

    resolve: {
        alias: Object.assign(alias, {
            common: path.join(__dirname, './src/common')
        })
    },

    devServer: {
        historyApiFallback: true,
        colors: true,
        port: 3000,
        progress: true,
        stats: 'errors-only'
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            ReactRouter: 'react-router',
			Util: path.join(__dirname, './src/common/js/util')
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //names数组中entry文件的顺序有时候很重要
            //实际项目中遇到过生产环境打包，两个文件的顺序导致的错误，但是开发环境打包是没有报错的问题
            //但是本例不存在这个问题，原因未知
			// names: ['vendor', 'common'],
            names: ['common', 'vendor'],
			filename: '[name].[hash:8].js',
			minChunks: Infinity
		}),
        new WebpackShellPlugin({
			onBuildStart: ['node genEntry.js']
		}),
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new cleanWebpackPlugin(['dist', 'build'])
    ]
}



module.exports = config;
