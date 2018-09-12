import './style.css';
import Heading from 'common/js/components/Heading';

export default class extends React.Component{
	render() {
		return <div id='about'>
			<Heading title='about title'/>
			about
			<img src={require('common/images/2.jpg')} alt=""/>
			<img src={require('common/images/cup.jpg')} alt=""/>
		</div>
	}
}
