import './style.css';
import A from 'common/js/components/A';
import B from 'common/js/components/B';

export default class extends React.Component{
	constructor() {
		super();
	}

	componentDidMount() {
		console.log('Home Component did mount');
		this.appendScript();
	}
	appendScript() {
		if(!document.getElementById('common')) {
			const script = document.createElement('script');
			const src = require('root/webpack-assets.json').common.js;
			console.log(src);
			script.id = 'common';
			script.src = src;
			script.onload = () => {
				//TODO 如果common.js脚本还没有下载完毕，用户开始切换到其他页面了，那么其他页面需要的组件会找不到，导致报错。
			};
			document.body.appendChild(script);		
		}
		
	}
	render() {
		return <div id='home'>
			<A/>
			<B/>
			Home
		</div>
	}
}
