import './main';
import GirlList from './components/GirlList';

export default class extends React.Component{
	constructor() {
		super();
		this.girls = [
			{name: '波多野结衣'},
			{name: '苍井空'},
			{name: '武藤兰'}
		];
	}
	render() {
		return <div id='home'>
			<GirlList girls={this.girls}/>
		</div>
	}
}
