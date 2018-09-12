window.onload = () => {
	const imgUrls = [
		'1.jpg',
		'2.jpg',
		'3.jpg'
	];

	const rand = Math.round(Math.random() * 2);
	const imgUrl = imgUrls[rand];
	const reqWithContext = require.context('./images/', true, /\.(png|jpg)$/);
	// console.log(reqWithContext.keys());	//['./2.jpg', './3.jpg', './animal/1.jpg']

	//测试是否引入了所有图片, 结果：引入了上下文的所有图片
	// reqWithContext.keys().forEach(file => {
	// 	reqWithContext(file);
	// });

	const imgNode = document.createElement('img');
	imgNode.src = reqWithContext('./' + imgUrl);

	document.getElementById('container').appendChild(imgNode);
}
