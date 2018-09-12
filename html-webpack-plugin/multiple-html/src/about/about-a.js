module.exports = {
	appendLink: () => {
		const button = document.createElement('a');
		const textNode = document.createTextNode('button');
		button.appendChild(textNode);
		button.href = './home.html';
		document.getElementById('container').appendChild(button);
	}
}
