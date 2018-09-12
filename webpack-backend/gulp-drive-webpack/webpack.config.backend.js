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
    entry: {
        server: path.join(__dirname, 'server/main.js')
    },
    target: 'node',
    output: {
        path: path.join(__dirname, 'server/build'),
        filename: '[name]-compiled.js'
    },
    externals: nodeModules,
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        }),
        new webpack.IgnorePlugin(/\.(css|less|scss|sass)$/)
    ]
};

module.exports = config;
