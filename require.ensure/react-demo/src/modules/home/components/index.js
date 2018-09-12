import './style.css';
import Heading from 'common/js/components/Heading';

const {dom} = Util;

export default class extends React.Component{
	constructor() {
		super();
		console.log(Util);
		console.log(dom.getBody());
	}
	render() {
		return <div id='home'>
			<Heading title='home title'/>
			Home
			<img src={require('common/images/2.jpg')} alt=""/>
			<img src={require('common/images/cup.jpg')} alt=""/>
		</div>
	}
}
