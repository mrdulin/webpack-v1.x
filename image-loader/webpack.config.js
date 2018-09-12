const htmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src',
    output: {
        path: 'dist',
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: [{
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            exclude: /node_modules/,
            loaders: [
                'file?hash=sha512&digest=hex&name=images/[name].[hash:8].[ext]',
                'image-webpack'
            ]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'style!css'
        }]
    },
    imageWebpackLoader: {
        mozjpeg: {
            quality: 65
        },
        pngquant: {
            quality: "65-90",
            speed: 4
        }
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
