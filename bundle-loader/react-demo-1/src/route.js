import {Route, IndexRoute} from 'react-router';

//同步加载component
// const routes = (
// 	<Route path='/'>
// 		<IndexRoute component={require('./modules/home').default}></IndexRoute>
// 		<Route path='about' component={require('./modules/about').default}></Route>
// 		<Route path='contact' component={require('./modules/contact').default}></Route>
// 	</Route>
// );


//异步加载component - 1
// const routes = (
// 	<Route path='/'>
// 		<IndexRoute getComponent={(nextState, cb) => {
// 			require.ensure([], require => {
// 				cb(require('./modules/home').default);
// 			}, 'home')
// 		}}></IndexRoute>
// 		<Route path='about' getComponent={(nextState, cb) => {
// 			require.ensure([], require => {
// 				cb(require('./modules/about').default);
// 			}, 'about')
// 		}}></Route>
// 		<Route path='contact' getComponent={(nextState, cb) => {
// 			require.ensure([], require => {
// 				cb(require('./modules/contact').default);
// 			}, 'contact')
// 		}}></Route>
// 	</Route>
// );

//异步加载component - 2
//https://github.com/webpack/webpack/issues/2675
//下面这种方式报warning, 在webpack@2中修复了
//用不用require.context，都是一样报warning.
// const loadComponentWithContext = (moduleName) => {
// 	return (nextState, cb) => {
// 		require.ensure([], require => {
// 			var reqWithCtx = require.context(`./modules/${moduleName}`, true, /\.js$/);
// 			var component = reqWithCtx('/index.js').default;
// 			console.log(component);
// 			cb(null, component);
// 		}, moduleName)
// 	}
// };

//使用这种方式，所有异步加载的组件被打包到一个chunk里了
//这是因为，webpack会判断有多少个require.ensure，有多少个require.ensure，代码分片出来的chunk就有多少个
//所以使用了bundle-loader, 它会给每一个require的文件添加一个require.ensure
// const loadComponent = (moduleName) => (nextState, cb) => {
// 	require.ensure([], require => {
// 		var es6Component = require(`./modules/${moduleName}/index.js`);
// 		cb(null, es6Component.default);
// 	})
// }


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
	</Route>
);
export default routes;

