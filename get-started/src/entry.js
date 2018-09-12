// document.write('It works');

//下面这种require使用loader的方式不推荐使用，而应该将loader配置在webpack.config.js中
// require('!style!css!./src/css/style.css');
//loader的顺序不能错，css loader和style loader的顺序颠倒，报错
// require('!css!style!./src/css/base.css');
// require('!style!css!./src/css/base.css');


require('./css/style.css');
require('./css/base.css');

document.write(require('./js/content.js'));

