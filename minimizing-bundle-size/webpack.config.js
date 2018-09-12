const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        app: './src/index.js',
        vendor: [
            'react', 
            'react-dom',
            'react-router/lib/Router',
            'react-router/lib/browserHistory'
        ]	
    },
    output: {
        path: './dist',
        filename: '[name].[hash:8].js',
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
        ]
    },

    devServer: {
        historyApiFallback: true,
        colors: true,
        port: 3000,
        progress: true,
        stats: 'errors-only'
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new cleanWebpackPlugin(['dist', 'build']),
        new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash:8].js', Infinity)
    ]
}

module.exports = config;
