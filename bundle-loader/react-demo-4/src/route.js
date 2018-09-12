const {Route, IndexRoute, Redirect, Link, IndexLink} = ReactRouter;

const App = ({children}) => (
    <div>
        <ul>
            <li><IndexLink to='/' activeClassName='active'>home</IndexLink></li>
            <li><Link to='/about' activeClassName='active'>about</Link></li>
            <li><Link to='/contact' activeClassName='active'>contact</Link></li>
        </ul>
        <hr/>
        {children}
        <p><Link to='/' activeClassName='active' onlyActiveOnIndex={true}>go back to home</Link></p>
    </div>
)

const dynamicRoutes = [
    'contact',
    'about'
]

const routes = {
    path: '/',
    component: App,
    getIndexRoute(nextState, cb) {
        require.ensure([], require => {
            cb(0, require('./modules/home'));
        }, 'indexRoute');
    },
    getChildRoutes(nextState, cb) {
        //第一种方式: 使用webpack提供的require.ensure
        // require.ensure([], require => {
        //     cb(0, [
        //         require('./modules/contact'),
        //         require('./modules/about')
        //     ])
        // }, 'dynamicChildRoutes')

        //第二种方式：使用bundle-loader
        //打包出来的文件发现两个问题：
        //1.我没有指定的404页面也被打包了
        //2.每个路由模块打包成了一个chunk，并且路由中require.ensure中的组件也被打包成了一个chunk，对比第一种方式
        let modules = [];
        for(let dynamicRoute of dynamicRoutes) {
            require('bundle-loader!./modules/'+ dynamicRoute + '/index.js')(function(module) {
                modules.push(module);
                if(modules.length === dynamicRoutes.length) {
                    cb(null, modules);
                }
            });
        }
    }
}
export default routes;

