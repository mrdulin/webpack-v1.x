import React, {render, PropTypes, Component} from 'react';

const App = class extends Component{
	render() {
		const {items} = this.props;
		const itemNodes = items.map((item, index) => {
			return <Item key={index} name={item}></Item>
		})
		return <div>
			<ul>{itemNodes}</ul>
		</div>
	}
}

const Item = class extends Component{
	render() {
		return <li>{this.props.name}</li>
	}
}

Item.propTypes = {
	name: PropTypes.string.isRequired
}

render(
	<App items={['angular', 'react', 'jquery']}/>,
	document.getElementById('app')
);
