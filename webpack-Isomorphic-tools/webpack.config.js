var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    assets: {
        images: {
            extensions: ['png']
        }
    }
};

var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(config);

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10240'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        webpackIsomorphicToolsPlugin
    ]
};
