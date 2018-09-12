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
            var hash = window.location.hash;
            const childRoutes = [
                require('./modules/contact'),
                require('./modules/about'),
                {
                    path: '*',
                    onEnter: (nState, replace) => replace('/') 
                }
            ];

            if(hash !== '#/') {
                if(!document.getElementById('common')) {
                    const script = document.createElement('script');
                    script.id = 'common';
                    script.src = require('root/webpack-assets.json').common.js;
                    document.body.appendChild(script);
                    script.onload = () => {
                        cb(0, childRoutes);
                    };
                } else {
                    cb(0, childRoutes);
                }
                
            }
            
            
        }, 'dynamicChildRoutes');
    }
}
export default routes;

