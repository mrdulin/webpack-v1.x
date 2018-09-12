#!/bin/sh

rm -rf ./dist

src='./src/'
dist='./dist/'

#Development shortcut and single entry point#
#开发模式参数 -d 等价于 --debug --devtool source-map --output-pathinfo
#开发模式+单入口文件
##webpack app=${src}app.js ${dist}[name].[hash].js -d

#output.file will be deprecated: Use 'output.filename' instead
#和上面的例子等价
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js -d

#Watch mode --watch#
#开启文件监控模式，当有文件变化，并且改文件被require到入口文件时，webpack重新编译
#不要开启输出文件hash，否则会无限在dist目录生成新的文件
##webpack app=${src}app.js ${dist}[name].js -d --watch

#Production shortcut -p#
#生产模式编译
#报错
#ERROR in app.2d5c3d7a390011f3d2ce.js from UglifyJs
#Unexpected token: punc ()) [./src/app.js:3,0]
#因为ES6语法，改成ES5语法即可
##webpack app=${src}app.js ${dist}[name].[hash].js -p

#webpack cli会从命令指定的参数和配置文件（默认是webpack.config.js）获取配置，结合两者的参数对文件进行编译
#这里我们指定webpack.config-1.js作为配置文件
#使用plugin和loader，及resolve之类的配置，能否通过cli?
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js -d


#--progress 参数，显示webpack打包编译的进度
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress

#--json 参数，将打包编译过程输出为json文件，但是可读性不好，json文件一般用于webpack分析工具
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress --json

#--no-color 参数，禁用在终端输出的打包编译信息字体颜色
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress --no-color

#--display-reasons 参数，输出模块被打包的详细原因
#例如：cjs require ./a.js [0] ./src/app.js 1:10-27    
#webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress --display-reasons

#--display-error-details 参数，输出模块打包编译时出现的错误详细信息
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress --display-error-details

#--display-modules参数，输出隐藏模块，隐藏模块指的是在["node_modules", "bower_components", "jam", "components"]目录下的模块
# webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --progress --display-modules

webpack --entry app=${src}app.js --output-path ${dist} --output-filename [name].[hash].js --config webpack.config-1.js --profile