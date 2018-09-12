import style from './main.module';

export default class extends React.Component{
	render() {
		return <div id='about' className={style.container}>
			<p>about</p>
			<div className={style.content}></div>
			<div className={style.avatar}></div>
		</div>
	}
}
