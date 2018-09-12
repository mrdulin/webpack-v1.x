const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackMiddleware = require("webpack-dev-middleware");
const config = require('./webpack.config');

const app = express();

const compiler = webpack(config);

const static_dir = path.join(__dirname, 'dist');

app.use(express.static(static_dir));
app.use(webpackMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000);
