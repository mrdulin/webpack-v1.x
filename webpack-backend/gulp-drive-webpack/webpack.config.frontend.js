/**
 * Created by dulin on 17/1/19.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var config = {
    entry: {
        app: path.join(__dirname, 'client/app/index')
    },
    output: {
        path: path.join(__dirname, 'client/dist'),
        filename: '[name]-[chunkhash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/app/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'client/dist')
        ], {
            root: __dirname,
            dry: false,
            verbose: true
        })
    ]
};

module.exports = config;
