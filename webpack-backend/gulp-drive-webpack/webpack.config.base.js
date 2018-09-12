/**
 * Created by dulin on 17/1/19.
 */
var config = {
    output: {
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

module.exports = config;
