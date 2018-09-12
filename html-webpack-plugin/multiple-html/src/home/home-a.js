module.exports = {
	appendHomeButton: () => {
		const button = document.createElement('a');
		const textNode = document.createTextNode('button');
		button.appendChild(textNode);
		button.href = './about.html';
		document.getElementById('container').appendChild(button);
	}
}
