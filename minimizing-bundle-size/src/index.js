import React from 'react';

//引入模块方式一：
// import {Router, browserHistory} from 'react-router';

/**
 * 打包文件大小:
192K    dist/app.6f5bba3a.js
4.0K    dist/index.html
752K    dist/vendor.6f5bba3a.js
948K    dist
 */


//引入模块方式二：webpack的entry字段中vendor: ['react', 'react-dom']，没有引入`react-router`
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';

/**
 * 打包文件大小：
 * 140K    dist/app.4825b9cf.js
4.0K    dist/index.html
752K    dist/vendor.4825b9cf.js
896K    dist
 */

/**
 * 但如果在webpack的vendor中添加`react-router`
 * 上述两种写法最终打包后的文件大小都一样，react-router所有模块都被打包进了vendor中
 * 
 * 解决方案1：
 * 在webpack的vendor中指定特定的模块，例如`react-router/lib/Router`，而不是指定`react-router`
 * 
 * 打包文件大小：
 * 4.0K    dist/app.98583444.js
4.0K    dist/index.html
884K    dist/vendor.98583444.js
892K    dist
 */




import {render} from 'react-dom';

const Home = () => {
    return <div>home</div>
};

const About = () => {
    return <div>about</div>
};

const Contact = () => {
    return <div>contact</div>
};

const App = ({children}) => {
    return <div>{children}</div>
};

const routes = {
    path: '/',
    component: App,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/contact',
            component: Contact
        }
    ]
};

render(
    <Router routes={routes} history={browserHistory}></Router>,
    document.getElementById('app')
)