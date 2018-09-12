var mod = require('./modules/nova');

//mod = {getBody: function getBody() {...}, nova: {hello: function hello(name) {...}}}
console.log(mod);

//export['nova'] = nova;
console.log(mod.nova.hello('novaline'));

//export['getBody'] = helpers.getBody
console.log(mod.getBody());

//export['getUA'] = helpers.getUserAgent
console.log(mod.getUA());


/** 引入非amd, cmd模块zepto */
var $ = require('zepto');

console.log($('body'));
console.log($.camelCase('hello-there'));