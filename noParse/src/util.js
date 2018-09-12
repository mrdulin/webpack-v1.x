const util = {
	appendButton: function() {
		const button = document.createElement('button');
		const textNode = document.createTextNode('A pure button')
		button.appendChild(textNode);
		button.classList.add('pure-button');
		document.body.appendChild(button);
	}
};

module.exports = util;
