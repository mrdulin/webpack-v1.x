import './main.scss';
import SearchBar from './components/SearchBar';

export default class extends React.Component{

	handleSearchSubmit = (e) => {
		console.log(e);
	}

	render() {
		return <div id='contact'>
			contact
			<SearchBar styleType='c' onSubmit={this.handleSearchSubmit}/>
		</div>
	}
}
