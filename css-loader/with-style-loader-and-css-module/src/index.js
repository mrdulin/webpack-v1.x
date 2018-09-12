var buttonStyle = require("./button.module.css");
require('style!./reset.css');
require('./parent.css');

console.log(buttonStyle);

window.addEventListener('DOMContentLoaded', init);

var view = {
	render: function(node) {
		document.body.appendChild(node);
	}
};
function init() {
	var buttonDefault = document.createElement('button');
	var buttonPrimary = buttonDefault.cloneNode();
	buttonDefault.textContent = '按钮(默认)';
	buttonDefault.className = buttonStyle.default;
	buttonPrimary.textContent = '按钮(主要)';
	buttonPrimary.className = buttonStyle.primary;
	view.render(buttonDefault);
	view.render(buttonPrimary);
}
