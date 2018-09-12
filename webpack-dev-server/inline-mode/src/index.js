import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, Link} from 'react-router';

class App extends Component{
    render() {
        return <div>
            React App
            <div>
                <Link to={'/about'}>about</Link>
            </div>
        </div>
    }
}

const About = () => {
    return <div>about</div>
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}></Route>
        <Route path='about' component={About}></Route>
    </Router>,
    document.getElementById('container')
)

