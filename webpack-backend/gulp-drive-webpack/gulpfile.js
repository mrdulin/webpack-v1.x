var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var merge = require('deepmerge');
var nodemon = require('nodemon');
var path = require('path');
var fs = require('fs');

function concatMerge(target, source, key) {
    if (target instanceof Array) {
        return [].concat(target, source);
    }
    return source;
}

var defaultConfig = require('./webpack.config.base');
var frontendConfig = require('./webpack.config.frontend');
var backendConfig = require('./webpack.config.backend');

var env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log('===========================================================');
console.log('gulp build:  ' + JSON.stringify(env));
console.log('===========================================================');

if (env === 'development') {
    defaultConfig.devtool = 'source-map';
    defaultConfig.debug = true;
    defaultConfig.output.pathinfo = true;
}

frontendConfig = merge(defaultConfig, frontendConfig, {arrayMerge: concatMerge});
backendConfig = merge(defaultConfig, backendConfig, {arrayMerge: concatMerge});

/**
 * webpack(webpackConfig) 返回 compiler
 * 可以调用compiler上的run方法来执行编译(增量编译)
 * 可以调用compiler上的watch方法来监视模块的变化并重新编译，watch会先走一遍run，所以没必要执行run再执行watch
 */
var backendCompiler = webpack(backendConfig);
var frontendCompiler = webpack(frontendConfig);


function compilerCallback(done) {
    return function (err, stats) {

        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
        }));

        if (done) {
            done();
        }
    }
}

gulp.task('backend-build', function (done) {
    backendCompiler.run(compilerCallback(done));
});


gulp.task('backend-watch', function () {

    var watchOptions = {
        aggregateTimeout: 300,
        pool: true
    };

    var watcher = backendCompiler.watch(watchOptions, function(err, stats) {
        compilerCallback()(err, stats);
        //编译打包完成后重启服务
        nodemon.restart();
    });
});

gulp.task('frontend-build', function (done) {
    frontendCompiler.run(compilerCallback(done));
});

gulp.task('frontend-watch', function () {

    var watchConfigs = {
        aggregateTimeout: 300,
        pool: true
    };
    frontendCompiler.watch(watchConfigs, compilerCallback());
});


gulp.task('build', ['backend-build', 'frontend-build']);

/**
 * 监视文件变化，增量编译打包
 * 但是我们的需求是编译打包出最新的服务器端文件后，服务器能重启来应用最新的代码，nodemon来实现
 */
gulp.task('run', ['backend-watch', 'frontend-watch'], function () {
    let filepath = path.join(__dirname, 'server/build');
    let filename = fs.readdirSync(filepath).filter(name => !/\.map$/.test(name))[0];


    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(filepath, filename),
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function () {
        console.log('Restarted!');
    });
});


