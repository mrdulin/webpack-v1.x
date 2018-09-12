const {Router, useRouterHistory} = ReactRouter;
import { createHashHistory } from 'history';
import routes from './routes';

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

ReactDOM.render(
	<Router history={history}>
		{routes}
	</Router>,
	document.getElementById('container')
);

window.addEventListener('hashchange', () => {
	// var hash = window.location.hash;
	// if(hash !== '#/' && !document.getElementById('common')) {
	// 	const script = document.createElement('script');
	// 	script.id = 'common';
	// 	script.src = require('root/webpack-assets.json').common.js;
	// 	document.body.appendChild(script);
	// }
});

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
})