import {Route, IndexRoute, Link} from 'react-router';

//使用bundle-loader，工作的很好，这里一定要写完整的文件路径，./modules/home不工作，./modules/home/index.js工作
const loadComponentWithBundleLoader = (moduleName) =>  (nextState, cb) => {
	require('bundle-loader!./modules/'+ moduleName + '/index.js')(function(module) {
		cb(null, module.default);
	});
}

const App = ({children}) => {
	return <div>
		<ul>
			<li><Link to='/'>home</Link></li>
			<li><Link to='/about'>about</Link></li>
			<li><Link to='/contact'>contact</Link></li>
		</ul>
		{children}
	</div>
}

const routes = (
	<Route path='/' component={App}>
		<IndexRoute getComponent={loadComponentWithBundleLoader('home')}></IndexRoute>
		<Route path='about' getComponent={loadComponentWithBundleLoader('about')}></Route>
		<Route path='contact' getComponent={loadComponentWithBundleLoader('contact')}></Route>
	</Route>
);
export default routes;

