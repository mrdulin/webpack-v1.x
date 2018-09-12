function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html += 'The magic footer';
      callback(null, htmlPluginData);
    });
  });

};


const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

const config = {
	context: process.cwd(),
	entry: {
		a: paths.src + '/a.js',
		b: paths.src + '/b.js'
	},

	output: {
		path: paths.dist,
		filename: '[name].js'
	},

	plugins: [
		new htmlWebpackPlugin({
			template: './index.html'
		}),
		new MyPlugin()
	]
}

module.exports = config;
