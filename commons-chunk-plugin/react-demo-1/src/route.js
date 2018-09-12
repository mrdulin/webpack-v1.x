const {Route, IndexRoute, Redirect, Link, IndexLink} = ReactRouter;

const loadComponentWithBundleLoader = (moduleName) =>  (nextState, cb) => {
	require('bundle-loader!./modules/'+ moduleName + '/index.js')(function(module) {
		cb(null, module.default);
	});
}

const App = ({children}) => (
    <div>
        <ul>
            <li><IndexLink to='/' activeClassName='active'>home</IndexLink></li>
            <li><Link to='/about' activeClassName='active'>about</Link></li>
            <li><Link to='/contact' activeClassName='active'>contact</Link></li>
        </ul>
        <hr/>
        {children}
    </div>
)

const routes = (
    <Route path='/' component={App}>
		<IndexRoute getComponent={loadComponentWithBundleLoader('home')}></IndexRoute>
		<Route path='about' getComponent={loadComponentWithBundleLoader('about')}></Route>
		<Route path='contact' getComponent={loadComponentWithBundleLoader('contact')}></Route>
	</Route>
);

export default routes;

