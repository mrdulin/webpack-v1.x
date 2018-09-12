const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');

const __PROD__ = process.env.NODE_ENV === 'production';
const __DEV__ = __PROD__ === false;

const config = {
	entry: src + '/main.js',
	output: {
		path: dist,
		filename: __DEV__ ? 'bundle.js' : '[name].[hash].js'
	},
	devtool: __DEV__ ? 'source-map' : false,

	plugins: [

		/**
		 * 该插件可以将命令行中指定的参数，或者自定义的一些参数暴露给全局window，例如NODE_ENV
		 * 不使用该插件，在客户端代码中是不能通过process.env.NODE_ENV拿到环境变量的
		 */
		new webpack.DefinePlugin({
			__DEV__: __DEV__,
  			__PROD__: __PROD__,
  			//下面这样写报错
  			// __String1__: '5fa3b9',

  			//必须使用JSON.stringify,
			__String2__: JSON.stringify('5fa3b9'),
			__Boolean1__: true,
			__Boolean2__: 'true',
			__Number1__: 1,
			__Number2__: '1',
			//对象的key, value也遵循上面的写法
			__Object__: {
				//下面这样没有JSON.stirngify的字符串会报错
				// name: 'novaline',
				name: JSON.stringify('novaline'),
				age: 21
			},
			__Function1__: function() {
				return 'webpack';
			},
			__Array__: [1,2,3,4,5],

            //应该是'NODE_ENV': '"production"'，而不是'NODE_ENV': 'production'
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new htmlWebpackPlugin({
			title: 'DefinePlugin Testing'
		}),
		new cleanWebpackPlugin(['dist', 'build'], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
};

module.exports = config;
