const {Router, browserHistory} = ReactRouter;
import './index.css';
import routes from './route';

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>,
	document.getElementById('container')
);
