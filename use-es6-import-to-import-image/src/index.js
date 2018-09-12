//es6这种方式导入图片等价于require('./images/avatar.jpg');
//为什么等价，因为webpack通过babel-loader最终会把es6的import编译成require
import url from './images/avatar.jpg';


window.onload = () => {
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);

	fetchData().then((result) => {
		console.log(result);
	});
}

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('测试babel对es6新API promise是不转换的，babel只转换es6的语法');
		}, 2000)
	})
}
