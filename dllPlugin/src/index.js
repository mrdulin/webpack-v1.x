
import routes from './route';
import {Router, browserHistory} from 'react-router';

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>,
	document.getElementById('container')
);
