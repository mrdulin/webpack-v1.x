require('purecss');
const util = require('util');
// const React = require('react');
// const ReactDOM = require('react-dom');
// import React from 'react';
// import ReactDOM from 'react-dom';

const App = React.createClass({
	render: function() {
		util.appendButton();
		return <div>
			<p> A React App </p>
		</div>
	}
});

ReactDOM.render(
	<App></App>,
	document.getElementById('app')
);
