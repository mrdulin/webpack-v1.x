const webpack = require('webpack');
const path = require('path')

const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
}

const htmlWebpackPluginBaseConfig = {
	template: paths.src + '/template.html',
	hash: true,
	minify: false
}

const config = {
	entry: {
		home: paths.src + '/home/',
		about: paths.src + '/about/',
		//独立的common，它没有依赖任何模块，也没有任何模块依赖它
		common: paths.src + '/common/'
	},

	output: {
		path: paths.dist,
		filename: '[name].js'
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin('share.bundle.js')
	],

	resolve: {
		extentions: ['', '.js']
	},

	generateHtml: (pages, commonDependencyChunks) => {
		if(pages.length === 0) return;
		const htmlWebpackPlugin = require('html-webpack-plugin');
		const pageLen = pages.length;
		for(let i = 0; i < pageLen; i++) {
			const page = pages[i];
			Array.prototype.push.apply(page.options.chunks, commonDependencyChunks);
			const pageConfig = Object.assign(htmlWebpackPluginBaseConfig, page.options, {
				filename: `${page.name}.html`,
				chunksSortMode: 'none'
			});
			const generatePage = new htmlWebpackPlugin(pageConfig);
			config.plugins.push(generatePage);
		}
	}
};

config.generateHtml([{
	name: 'home',
	options: {
		chunks: ['common', 'home']
	}
}, {
	name: 'about',
	options: {
		chunks: ['about', 'common']
	}
}], [
	'share.bundle.js'
]);

module.exports = config;
