import htmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';

export default {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    // devtool是cheap-source-map时，css-loader的sourceMap失效
    // 文档: cheap-source-map - A SourceMap without column-mappings. SourceMaps from loaders are not used.
    // devtool: 'cheap-source-map',

    // 以下几种的css-loader的sourceMap有效
    // devtool: 'inline-source-map',
    // devtool: 'source-map',
    // 推荐下面这种：
    // 不包含列信息的意思是，比如选中一个css的class名，sourceMap只能指定到该class名所在的文件的第一行，并不能具体的找到是在文件中的哪一行。
    devtool: 'cheap-module-source-map', //A SourceMap without column-mappings. SourceMaps from loaders are simplified to a single mapping per line.
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel',
                include: path.join(__dirname, './src/')
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, './src/'),
                //要开启css的sourceMap, 需要开启devtool的sourceMap和开启css-loader和sass-loader的sourceMap
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass')
            }
        ]
    },
    resolve: {
        alias: {
            styles: path.join(__dirname, './styles')
        }
    },
    sassLoader: {
        includePaths: ['common'],
        sourceMap: true
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new htmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin('dist', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
    ]
}
