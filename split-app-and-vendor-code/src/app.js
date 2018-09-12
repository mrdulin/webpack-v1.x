var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render: function() {
		return <div>
			This is a react app.
		</div>
	}
});

ReactDOM.render(
	<App></App>,
	document.getElementById('container')
)
