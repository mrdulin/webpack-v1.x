const {Route, IndexRoute, Redirect} = ReactRouter;

//使用bundle-loader，工作的很好，这里一定要写完整的文件路径，./modules/home不工作，./modules/home/index.js工作
const loadComponentWithBundleLoader = (moduleName) =>  (nextState, cb) => {
	require('bundle-loader!./modules/'+ moduleName + '/index.js')(function(module) {
		cb(null, module.default);
	});
}

const routes = (
	<Route path='/'>
		<IndexRoute getComponent={loadComponentWithBundleLoader('home')}></IndexRoute>
		<Route path='about' getComponent={loadComponentWithBundleLoader('about')}></Route>
		<Route path='contact' getComponent={loadComponentWithBundleLoader('contact')}></Route>
		{/*<Redirect from='*' to='/'></Redirect>*/} {/*重定向到首页的路由 http://localhost:3000 */}
		<Route path='*' getComponent={loadComponentWithBundleLoader('404')}></Route> {/*页面是404，但url的路由依旧保持不变*/}
	</Route>
);
export default routes;

