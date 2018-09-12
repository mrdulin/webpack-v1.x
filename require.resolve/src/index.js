var a = require('./a.js');
console.log(require.resolve('./a.js')); //1

//当前模块的id
console.log(module.id); //0