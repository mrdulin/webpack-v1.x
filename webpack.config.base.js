const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {join} = require('./util');

exports.plugins = [
    new CleanWebpackPlugin(['dist', 'build'], {
        root: process.cwd()
    }),
    new HtmlWebpackPlugin({
        template: 'app/index.html',
        filename: 'index.html'
    })
];

exports.entry = {
    app: join('app')
};

exports.output = {
    path: join('dist'),
    filename: 'bundles/[name].[hash:8].js',
    pathinfo: true
};
