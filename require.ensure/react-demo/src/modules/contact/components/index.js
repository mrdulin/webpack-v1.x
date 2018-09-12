import './style.css';
import Heading from 'common/js/components/Heading';

export default class extends React.Component{
	render() {
		const money = Util.currencyFormat.moneyFormat(20000);
		return <div id='contact'>
			<Heading title='contact title'/>
			contact
			<p>I want ￥{money}</p>
			<img src={require('common/images/2.jpg')} alt=""/>
			<img src={require('common/images/cup.jpg')} alt=""/>
		</div>
	}
}
