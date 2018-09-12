const { Route, IndexRoute, Redirect, Link, IndexLink } = ReactRouter;

import Home from 'modules/home';
import About from 'modules/about';
import Contact from 'modules/contact';

//这里的Home不是组件，而是bundle-loader包装过的，由于bundle-loader使用lazy参数，所以这里的Home是下面的load函数
/**
 *
var load = require("bundle-loader?lazy!./file.js");

// The chunk is not requested until you call the load function
load(function(file) {

});
 */
console.log(Home);

const loadComponentWithBundleLoader = (module) => (nextState, cb) => {
  //如果是namespace的路由，一个路由下可能有多个组件，例如{sidebar: Sidebar, main: Main}
  module(component => {
    console.log(component);
    cb(null, component.default);
  })
}

const App = ({ children }) => (
  <div>
    <ul>
      <li><IndexLink to='/' activeClassName='active'>home</IndexLink></li>
      <li><Link to='/about' activeClassName='active'>about</Link></li>
      <li><Link to='/contact' activeClassName='active'>contact</Link></li>
    </ul>
    <hr />
    {children}
  </div>
)

const routes = (
  <Route path='/' component={App}>
    <IndexRoute getComponent={loadComponentWithBundleLoader(Home)}></IndexRoute>
    <Route path='about' getComponent={loadComponentWithBundleLoader(About)}></Route>
    <Route path='contact' getComponent={loadComponentWithBundleLoader(Contact)}></Route>
    <Redirect from='*' to='/'></Redirect>
  </Route>
);
export default routes;

