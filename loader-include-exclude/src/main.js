const a = require('./include/a.js');
const b = require('./exclude/b.js');

console.log(a.moduleName)
console.log(b.moduleName)

a.appendLink({
	text: 'google',
	url: 'http://www.google.com',
	target: '__blank',
	el: document.body
})

b.appendLink({
	text: 'youtube',
	url: 'http://www.youtube.com',
	target: '__blank',
	el: document.body
})
