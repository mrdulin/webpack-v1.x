require('./style.css');

window.onload = () => {
	const url = require('./images/1.jpg');
	console.log(url);
	const imgNode = document.createElement('img');
	imgNode.src = url;
	document.body.appendChild(imgNode);
}
