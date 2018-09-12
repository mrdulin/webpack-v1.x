//使用script-loader会将指定的脚本在全局上下文环境中执行
//通过ProvidePlugin暴露$变量，必须通过window.$使用
console.log(window.$);

//直接通过$是不能使用的，因为不要忘记，在webpack构建系统中，所有的代码都被打包进了模块，默认的上下文并不是window
console.log($);
document.write(window.$.camelCase('hello-there'));