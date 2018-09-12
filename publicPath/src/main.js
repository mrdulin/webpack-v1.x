require('./css/main.css');

window.onload = () => {
	const url = require('./image/3.jpg');
	const img = document.createElement('img');
	img.src = url;
	document.body.appendChild(img);
}
