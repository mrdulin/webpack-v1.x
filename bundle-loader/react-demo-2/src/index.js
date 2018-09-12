import routes from './route';
import {Router, browserHistory} from 'react-router';
import './index.css';

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>,
	document.getElementById('container')
);
