require('./reset.css')
require('./style.css');

//点击button，将添加或者删除下面这两个样式的style标签，style标签被添加到head标签
var bgColor = require('./bgColor.useable.css');
var buttonStyle=  require('./button.useable.css');
var testStyle = require('./test.useable.css');

require("./input.css");

window.addEventListener('DOMContentLoaded', init);

var state = {
	isUsed: false
}

function init() {
	var button = document.getElementById('toggle-btn');
	button.addEventListener('click', toggleListStyle, false);
}

function toggleListStyle(e) {
	console.log(state.isUsed);
	if(!state.isUsed) {
		bgColor.use();
		buttonStyle.ref();
		testStyle.use();
		state.isUsed = true;
	} else {
		//不要多次调用unuse/unref，可能会产生未知问题。
		bgColor.unuse();
		buttonStyle.unref();
		testStyle.unuse();
		state.isUsed = false;
	}
}
