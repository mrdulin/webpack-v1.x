const a = require('./a.js');
// const b = require('./b.js');
document.addEventListener('DOMContentLoaded', function() {
	a.appendLink({
		text: 'google',
		url: 'http://www.google.com',
		el: document.body,
		target: '__blank'
	});
});
