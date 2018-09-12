// console.log(require('./a'))
var transferCheck = require('./a')


var obj = {
	a: true,
	b: true,
	c: true,
	d: '123',
	e: []
};

var keys = ['a', 'b', 'c'];

console.log(transferCheck(keys, ['a', 'c'], obj))
console.log(transferCheck(keys, [], obj))
console.log(transferCheck(keys, ['b'], obj))

console.log(require('./b'))


