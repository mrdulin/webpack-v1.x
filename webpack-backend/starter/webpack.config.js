/**
 * Created by dulin on 17/1/19.
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('../../node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = {
    entry: './src/main.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js',
        pathinfo: true
    },
    devtool: 'source-map',
    externals: nodeModules,
    plugins: [
        //raw: true, 生成原始的文本，不将其包装成注释
        //entryOnly: false, 给每一个生成的chunk文件头部都添加这个banner，例如code splitting
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        }),
        new webpack.IgnorePlugin(/\.(css|less|scss|sass)$/)
    ]
};

module.exports = config;
