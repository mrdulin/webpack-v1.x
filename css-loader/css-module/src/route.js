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
        require.ensure([], require => {
            cb(0, [
                require('./modules/contact'),
                require('./modules/about')
            ])
        }, 'dynamicChildRoutes');
    }
}
export default routes;

