const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const join = (...args) => path.join.apply(null, [process.cwd(), ...args]);

const config = {
    entry: {
        app: join('app')
    },
    devtool: 'eval-source-map',

    output: {
        path: join('dist'),
        filename: '[name].js',
        publicPath: '/',
        pathinfo: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: join('app/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(join('dist')),
        new DashboardPlugin()
    ]
};

module.exports = config;
