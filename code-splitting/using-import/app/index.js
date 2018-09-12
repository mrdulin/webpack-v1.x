import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, browserHistory } from 'react-router';

const App = ({ children }) => {
  return (
    <div>
      <ul>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
      <div>{children}</div>
    </div>
  )
};

const routes = {
  path: '/',
  component: App,
  getChildRoutes(nextState, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./modules/home'),
        require('./modules/about'),
        require('./modules/contact')
      ]);
    }, 'dynamicRoutes');
  }
};

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app')
);

