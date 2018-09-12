var $ =  require('jquery');
//对于不属于commonjs或者amd模块规范的模块
//chosen库使用前，要保证全局变量window上有jquery，即window.$或者window.jQuery存在
//还有些其他的库，默认的认为this指向的是window对象
//如果不存在，报如下错误
//Uncaught ReferenceError: jQuery is not defined

//解决方案是：imports-loader

require('chosen-js/chosen.jquery');
console.log(this, $)

window.onload = init;

function init() {
    console.log('init');
    $('.chosen-select').chosen();
}
